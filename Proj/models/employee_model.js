// IMPORT MONGOOSE 
const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let EmployeeModel = model_mongoose.model('emp_model_collection', 
{
    empid: {type: Number},
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number },
    regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = EmployeeModel ;
