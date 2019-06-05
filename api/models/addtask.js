
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addtask = new Schema({
    project_id: { type: String},
    discription: { type: String},
    date: { type: String},
    user_id: { type: String},
    Hours: { type: String},
    status: { type: String},
   

     })

module.exports = mongoose.model('Task', addtask);


