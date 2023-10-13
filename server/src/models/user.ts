const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        match: /^[A-Za-z\s]+$/ 
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value:any) => {
                
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    saltRound: {
        type: String,
        required: true,

    },
    dateOfBirth: {
        type: Date,
        required: true,

    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (value:any) => {
               
                return /^\d{10}$/.test(value);
            },
            message: 'Invalid phone number format'
        }
    },
    address: {
        type: String,
        required: true,
        maxLength: 100
    },
    city: {
        type: String,
        required: true,
        maxLength: 50,
        match: /^[A-Za-z\s]+$/ 
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
        validate: {
            validator: (value:any) => {
               
                return /^\d{6}$/.test(value);
            },
            message: 'Invalid zip code format'
        }
    },
    country: {
        type: String,
        required: true
    },
    securityQuestion: {
        type: String,
        required: true
    },
    securityAnswer: {
        type: String,
        required: true,
        maxLength: 100
    }
});

const User = mongoose.model('User', userSchema);

export default User;