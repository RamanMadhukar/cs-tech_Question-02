import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const Edit = () => {

    const { empId } = useParams();



    const initialvalues = {
        name: '',
        email: '',
        salary: '',
        designation: '',
        buttonText: 'Update'
    }



    const [employee, setEmployee] = useState(initialvalues);


    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios({
            method: 'GET',
            url: "http://localhost:5000/employes/" + empId
        })
            .then(response => {
                console.log(response);
                const { name, email, salary, designation, buttonText } = response.data;

                setEmployee({
                    ...employee,
                    name,
                    email,
                    salary,
                    designation
                })

            })
            .catch(error => {
                console.log('Data not found', error);

            });
    };

    const { name, email, salary, designation, buttonText } = employee;

    const handleChange = name => event => {
        setEmployee({ ...employee, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setEmployee({ ...employee, buttonText: 'Updating' });
        axios({
            method: 'PUT',
            url: "http://localhost:5000/update/" + empId,

            data: { name, email, salary, designation },
        })
            .then(response => {
                console.log('employee updated Successfully !', response);
                setEmployee({ ...employee, buttonText: 'Updated' });
                window.location.href = "http://localhost:3000";
                toast.success(response.data.message);


            })
            .catch(error => {
                console.log('ERROR ON UPDATEDING EMPLOYEE IN DATABASE', error.response.data.error);
                setEmployee({ ...employee, buttonText: 'Update' });
                toast.error(error.response.data.error);



            });
    };

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
            <ToastContainer />

            <Grid className="edit-grid" >
                <form >
                    <TextField item className="textfield" id="outlined-basic" label="Name" onChange={handleChange('name')} value={name} /> <br />
                    <TextField item className="textfield" id="outlined-basic" label="Email" onChange={handleChange('email')} value={email} /><br />
                    <TextField item className="textfield" id="outlined-basic" label="Salary" onChange={handleChange('salary')} value={salary} /><br />
                    {/* <TextField item className="textfield" id="outlined-basic" label="Designation" onChange={handleChange('designation')} value={designation} /> <br /> */}

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

        </>
    )
}

export default Edit
