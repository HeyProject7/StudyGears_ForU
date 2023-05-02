const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const schema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    }
});
// Mongoose Looks for Lowercase Model Name ex. Tanks=>tanks
module.exports = mongoose.model('Employee',schema)
