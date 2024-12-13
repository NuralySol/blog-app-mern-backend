// Updated blog model with author reference to User model so that it depends on the User model

import mongoose from 'mongoose';

// Define the Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [100, 'Blog title cannot exceed 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Blog content is required'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: [true, 'Author is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;