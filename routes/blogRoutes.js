import express from 'express';
import {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blogController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware for blog creation/updating
const validateBlog = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Public Routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Authenticated Routes
router.post('/', verifyToken, validateBlog, createBlog);
router.put('/:id', verifyToken, authorizeRoles('admin', 'user'), validateBlog, updateBlog);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteBlog);

export default router;