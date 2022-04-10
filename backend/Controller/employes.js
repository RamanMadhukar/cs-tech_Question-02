const Employee = require('../Database/employesDB')

exports.employes = (req, res) => {
    const { name, email, salary, designation } = req.body;
    const employee = new Employee({ name, email, salary, designation });


    employee.save((err, data) => {
        if (err) {
            console.log('SAVE employee IN DATABASE ERROR', err);
            return res.status(400).json({
                error: 'Error saving employee in database. Try again'
            });
        }
        return res.json({
            message: 'employee created Successfully !.'
        });
    });


}

exports.getEmployes = (req, res) => {

    Employee.find( function (err, found) {
        return res.json(found);
    });

    
}

exports.searchEmployes=(req,res)=>{
    const {name, email} = req.query
    Employee.find({$or:[{name:name},{email:email}]},function(err,found){
        return res.json(found);
    });
}



exports.getEmployesId = (req, res) => {
    const id = req.params.id;
    Employee.findById(id, function (err, found) {
        return res.json(found);
    });
}

exports.updateEmployes = (req, res) => {
    const id = req.params.id;
    const { name, email, salary, designation } = req.body;

    Employee.findOneAndUpdate({_id:id}, req.body, function (error) {
            if(error){
                console.log(error);
            }
            else{
                console.log("successfully updated");
                res.json();

            }
        }
    

    );
}

exports.deleteEmp = (req, res) => {
    const id = req.params.id;
    Employee.deleteOne({ _id: id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Successfully deleted");
            res.json("deleted successfully")
        }
    });
}


