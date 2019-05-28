
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const department = new Schema({
    departmentname: { type: String,unique : true},

    
})

module.exports = mongoose.model('department', department);


