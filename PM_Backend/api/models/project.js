
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
    serialno: { type: String,unique : true},
    projectname: { type: String,unique : true},
    startDate: { type: String,unique : true},
    endDate: { type: String,unique : true},
    upload: { type: String,unique : true},
    status: { type: String,unique : true},
})

module.exports = mongoose.model('project', project);


