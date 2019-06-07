
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newtask = new Schema({
    discription: { type: String},
    project_id: { type: String},
    employeename: { type: String},
    Hours: { type: String},
    date: { type: String},
    user_id: { type: String},  
    status: { type: String},
    timeout: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: "employee" },
     })

module.exports = mongoose.model('newTask', newtask);


