import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Home = () => {
    const initialvalues = {
        name: '',
        email: '',
        salary: '',
        designation: '',
        buttonText: 'Submit'
    }

    const [employee, setEmployee] = useState(initialvalues);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        getData();
    }, []);


    useEffect(() => {
        searchFunBtn();
    }, []);



    const getData = () => {
        axios({
            method: 'GET',
            url: "http://localhost:5000/employes"
        })
            .then(response => {
                console.log(response);
                setData(response.data)
            })
            .catch(error => {
                console.log('Data not found');
            });
    };




    const { name, email, salary, designation, buttonText } = employee;

    const handleChange = name => event => {
        setEmployee({ ...employee, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setEmployee({ ...employee, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: "http://localhost:5000/employes",

            data: { name, email, salary, designation },
        })
            .then(response => {
                console.log('employee created Successfully !', response);
                setEmployee({ ...employee, name: '', email: '', salary: '', designation: '', buttonText: 'Submit' });
                toast.success(response.data.message);



            })
            .catch(error => {
                console.log('ERROR ON SAVING EMPLOYEE IN DATABASE', error.response.data.error);
                setEmployee({ ...employee, buttonText: 'Submit' });
                toast.error(error.response.data.error);

            });
    };

    const deleteData = (id) => {
        axios({
            method: 'DELETE',
            url: "http://localhost:5000/delete/" + id,

        })
            .then(response => {
                console.log('employee deleted Successfully !', response);
                window.location.reload(false);

            })
            .catch(error => {
                console.log('ERROR ON DELETING EMPLOYEE IN DATABASE', error.response.data.error);
            });
    }

    const searchFun = (e) => {
        setSearch(e.target.value);
        console.log(search);

    }



    const searchFunBtn = (e) => {

        axios({
            method: 'GET',
            url: "http://localhost:5000/search/" + window.location.search
        })
            .then(response => {
                console.log(response);
                setSearch(response.data)

            })
            .catch(error => {
                console.log('Data not found');
            });
    }

    const designatio = [
        {
            value: '',
            label: 'Please select your designation',
        },
        {
            value: 'Frontend Developer',
            label: 'Frontend Developer',
        },
        {
            value: 'Backend Developer',
            label: 'Backend Developer',
        },
        {
            value: 'Full Stack Developer',
            label: 'Full Stack Developer',
        },
        {
            value: 'Manager',
            label: 'Manager',
        },
    ];

    return (
        <>
            <h1>2. Perform  CRUD operation with server controls use required field for all with all attribute.
                Create  One Master For Designation And bind This in Dropdown
            </h1>
            <ToastContainer />


            <Grid container className="top-grid" >
                <Grid item xs={4} >
                    <form >
                        <TextField item className="textfield" id="outlined-basic" label="Name" variant="outlined" onChange={handleChange('name')} value={name} /> <br />
                        <TextField item className="textfield" id="outlined-basic" label="Email" variant="outlined" onChange={handleChange('email')} value={email} /><br />
                        <TextField item className="textfield" id="outlined-basic" label="Salary" variant="outlined" onChange={handleChange('salary')} value={salary} /><br />
                        {/* <TextField item className="textfield" id="outlined-basic" label="Designation" variant="outlined" onChange={handleChange('designation')} value={designation} /> <br /> */}
                        <TextField item className="textfield" id="outlined-select-currency-native" select value={designation}
                            onChange={handleChange('designation')}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {designatio.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField> <br />

                        <Button className="btn" variant="contained" type="submit" onClick={clickSubmit} >{buttonText}</Button>

                    </form>

                </Grid >


                <Grid item xs={8}>
                    <div className="second-pane">

                        <div >
                            <form className="search" method="GET">
                                <TextField name="name" type="text" className="textfield search-text " id="name" label="Search By Name" variant="outlined" />
                                <Button className="btn" variant="contained" type="submit" onSubmit={searchFunBtn}  >Search</Button>

                            </form>

                        </div>



                        <div  >

                            <TableContainer component={Paper} className="table">
                                <Table aria-label="a dense table" size="small">
                                    <TableHead>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Email</TableCell>
                                            <TableCell align="right">Salary</TableCell>
                                            <TableCell align="right">Designation</TableCell>
                                            <TableCell align="right">Action</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>



                                        {search.map((emp) => (
                                            <TableRow key={emp._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">{emp.name}</TableCell>
                                                <TableCell align="right">{emp.email}</TableCell>
                                                <TableCell align="right">{emp.salary}</TableCell>
                                                <TableCell align="right">{emp.designation}</TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/edit/${emp._id}`}>
                                                        <i className="fas fa-edit edit"></i>
                                                    </Link>
                                                    <span className="slash">/</span>
                                                    <i className="fas fa-trash delete" onClick={() => deleteData(emp._id)} ></i>

                                                </TableCell>

                                            </TableRow>
                                        ))}



                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>


                    </div>
                </Grid>

                <Grid item xm={12} className="all-div">

                    <h4>All Empolyees Data</h4>

                    <TableContainer component={Paper} className="table">
                        <Table aria-label="a dense table" size="small">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Salary</TableCell>
                                    <TableCell align="right">Designation</TableCell>
                                    <TableCell align="right">Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>



                                {data.map((emp) => (
                                    <TableRow key={emp._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{emp.name}</TableCell>
                                        <TableCell align="right">{emp.email}</TableCell>
                                        <TableCell align="right">{emp.salary}</TableCell>
                                        <TableCell align="right">{emp.designation}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/edit/${emp._id}`}>
                                                <i className="fas fa-edit edit"></i>
                                            </Link>
                                            <span className="slash">/</span>
                                            <i className="fas fa-trash delete" onClick={() => deleteData(emp._id)} ></i>

                                        </TableCell>

                                    </TableRow>
                                ))}



                            </TableBody>
                        </Table>
                    </TableContainer>


                </Grid>


            </Grid>




        </>
    )
}

export default Home
