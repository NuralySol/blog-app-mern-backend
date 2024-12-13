// This is a User model file that defines the schema for the User collection in the MongoDB database.

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Email validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // User roles
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;