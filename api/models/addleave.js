
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addleave = new Schema({
    EmployeeName: { type: String},
    typeofDay: { type: String},
    typeofleave: { type: String},
    Description: { type: String},
    user_id: { type: String},
    startDate: { type: String},
    status: { type: String},

})

module.exports = mongoose.model('addleave', addleave);


