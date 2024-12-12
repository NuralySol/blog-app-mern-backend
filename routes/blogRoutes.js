import express from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';

const router = express.Router();

// GET all blogs, home route
router.get('/', getBlogs); // GET is used to retrieve a resource

// GET a single blog by ID
router.get('/:id', getBlogById); // GET is used to retrieve a resource

// POST a new blog
router.post('/', createBlog); // POST is used to create a new resource

// UPDATE a blog by ID
router.put('/:id', updateBlog); // PUT is used to update an entire resource

// DELETE a blog by ID
router.delete('/:id', deleteBlog); // DELETE is used to delete a resource

export default router;