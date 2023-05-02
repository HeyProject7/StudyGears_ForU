const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
            // required: true
    },
    supercoins: {
        type: Number,
        default: 1000
    }
});
module.exports = mongoose.model('users', userSchema);