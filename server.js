import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import logger from './config/logger.js';
import connectDB from './config/db.js';

// Dotenv configuration
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB()
    .then(() => logger.info('MongoDB connected successfully'))
    .catch(err => logger.error(`MongoDB connection error: ${err.message}`));

// Root route for API documentation or default response
app.get('/', (req, res) => {
    res.send('Welcome to the Blog App API');
});

// Routes
app.use('/api/blogs', blogRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));