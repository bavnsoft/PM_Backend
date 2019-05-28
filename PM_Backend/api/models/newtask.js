
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newtask = new Schema({
    discription: { type: String},
    date: { type: String},
    user_id: { type: String},  
    status: { type: String},
     })

module.exports = mongoose.model('newTask', newtask);


