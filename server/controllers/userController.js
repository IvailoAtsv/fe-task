const express = require('express');
const router = express.Router();
const userManager = require('../managers/userManager');

// Route: /user/register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, password, confirmPassword, interests, avatar } = req.body;
        // You can perform validation checks here
        
        // Call the user manager to register the user
        await userManager.register({ firstName, lastName, password, confirmPassword, interests, avatar });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
