const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    
    },
    designation: {
        type: String,
        required: false,
    
    },
    email: {
        type: String,
        required: false,
        unique:true
    },
    phone: {
        type: String,
        required: false,
    },
    Gender: {
        type: String,
        required: false,
    },
    City: {
        type: String,
        required: false,
    },
    State: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('user', userSchema);
