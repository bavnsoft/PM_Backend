
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addtask = new Schema({
    discription: { type: String},
    date: { type: String},
    user_id: { type: String},  
    status: { type: String},
    timeout: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: "employee" },
     taskk: { type: String,unique : true},
     Name: { type: String,unique : true},
     project_id: { type: String,unique : true},
     description: { type: String,unique : true},
     Hours: { type: String,unique : true},
     
     })

module.exports = mongoose.model('Task', addtask);


