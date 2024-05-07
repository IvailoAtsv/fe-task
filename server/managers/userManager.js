const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (userData) => {
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new User({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashedPassword,
            interests: userData.interests,
            avatar: userData.avatar,
        });
        await newUser.save();
    } catch (error) {
        throw error;
    }
};
