const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true, // Har user ka email munfarid (unique) hoga
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    }
}, {
    timestamps: true // createdAt aur updatedAt fields khud-ba-khud add hojayengi
});

const User = mongoose.model('User', userSchema);

module.exports = User;