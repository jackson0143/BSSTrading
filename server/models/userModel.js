const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: new Date(),
      },
});

module.exports = mongoose.model('User', UserSchema);