const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    
    },
    email: {
        type: String,
        required: false,
        unique:true
    },
    password: {
        type: String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('user', userSchema);
