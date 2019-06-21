
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const overtime = new Schema({
    overtimeDate: { type: String},
    Time: { type: String},
    //Timeid: { type: String},
   // user_id: { type: Schema.Types.ObjectId, ref: "newTask" },
    id: { type: String},

   


})

module.exports = mongoose.model('overtime', overtime);


