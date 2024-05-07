const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],
    },
    avatar: {
        type: String, // Assuming you're storing the avatar image URL
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
