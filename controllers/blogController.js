//! This is a controller for the blog page for all CRUD operations. The controller is a function that is called when a route is hit. The controller is responsible for handling the request and sending a response back to the client. The controller is imported into the routes file and used as a callback function for the route. The controller is where the business logic of the application is implemented. The controller is responsible for interacting with the model to retrieve data and send data back to the client

import Blog from '../models/blogModel.js'; // Import the Blog model
import mongoose from "mongoose"; // ✅ Fix: Import mongoose to validate ObjectId

// GET all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blogs from the database
        res.json(blogs); // Send the blogs as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id); // Find blog by ID
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new blog
const createBlog = async (req, res) => {
    try {
        console.log("🛠 Incoming Blog Data:", req.body);
        console.log("✅ User ID from token:", req.user.id); // ✅ Log the user ID

        const { title, content } = req.body;

        if (!title || !content) {
            console.error("🚨 Missing required fields!");
            return res.status(400).json({ message: "Title and content are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            console.error("🚨 Invalid ObjectId for author:", req.user.id);
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const newBlog = new Blog({
            title,
            content,
            author: req.user.id, // ✅ Store ObjectId instead of email
        });

        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (error) {
        console.error("🚨 Server Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update blog
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id); // Delete blog
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Export the controller functions to be used in the routes file
export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };