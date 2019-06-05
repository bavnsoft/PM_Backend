
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee = new Schema({
    employeeid: { type: String,unique : true},
    employeename: { type: String,unique : true},
    employeeemail: { type: String,unique : true},
    EmpPassword: { type: String,unique : true},
    PhoneNo: { type: String,unique : true},
    employeedepartment: { type: String,unique : true},
    employeeprofile: { type: String,unique : true},
    user_id: { type: Schema.Types.ObjectId, ref: "newTask" },


   
})

module.exports = mongoose.model('employee', employee);


