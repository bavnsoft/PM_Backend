
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee = new Schema({
    employeeid: { type: String},
    employeename: { type: String},
    employeeemail: { type: String},
    EmpPassword: { type: String},
    PhoneNo: { type: String},
    employeedepartment: { type: String},
    employeeprofile: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: "newTask" },
    role: { type: String}


   
})

module.exports = mongoose.model('employee', employee);


