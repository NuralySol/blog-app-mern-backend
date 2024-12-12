import mongoose from 'mongoose';

// Define the Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true, // Removes whitespace from the beginning and end
        maxlength: [100, 'Blog title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Blog content is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the current date
    }
});

// Create and export the Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;