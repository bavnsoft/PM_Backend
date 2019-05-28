
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeout = new Schema({
    timeout: { type: String},
    timein: { type: String},
    user_id	: { type: String},
    status: { type: String},
    
     })

module.exports = mongoose.model('clockout', timeout);


