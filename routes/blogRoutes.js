import express from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all blogs, home route
router.get('/', getBlogs); // GET is used to retrieve a resource

//! POST a new blog an authenticated user and admin, the below routes are protected
// GET a single blog by ID
router.get('/:id', verifyToken, getBlogById); // GET is used to retrieve a resource

// POST a new blog
router.post('/', verifyToken, createBlog); // POST is used to create a new resource

// UPDATE a blog by ID
router.put('/:id', verifyToken, authorizeRoles('admin', 'user'), updateBlog); // Authenticated

// DELETE a blog by ID
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteBlog); // Admin only can delete

export default router;