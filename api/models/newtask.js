
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newtask = new Schema({
    discription: { type: String},
    date: { type: String},
    user_id: { type: String},  
    status: { type: String},
    user_id: { type: Schema.Types.ObjectId, ref: "employee" },
     })

module.exports = mongoose.model('newTask', newtask);


