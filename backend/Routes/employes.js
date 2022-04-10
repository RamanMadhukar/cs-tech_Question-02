const express = require('express');
const router = express.Router();
const {employes, getEmployes, getEmployesId, updateEmployes, deleteEmp, searchEmployes} = require("../Controller/employes");
const {employeeRegisterValidator} = require('../validator/employee');
const { runValidation } = require('../validator');


router.post("/employes",employeeRegisterValidator, runValidation, employes );
router.get("/employes", getEmployes);
router.get("/employes/:id", getEmployesId);
router.put("/update/:id",employeeRegisterValidator, runValidation, updateEmployes);
router.delete("/delete/:id", deleteEmp);
router.get("/search", searchEmployes);





module.exports = router;