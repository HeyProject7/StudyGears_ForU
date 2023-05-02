const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    refreshToken: String // Optonal Because Not Every Time We Not Require Token
});
const model = mongoose.model("admin", adminSchema);
module.exports = model;