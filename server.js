import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import blogRoutes from './routes/blogRoutes.js';
import logger from './config/logger.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// Dotenv configuration
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Connect to MongoDB
connectDB()
    .then(() => logger.info('MongoDB connected successfully'))
    .catch(err => logger.error(`MongoDB connection error: ${err.message}`));

// Request Logging Middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog App API');
});
// Mount auth routes
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/blogs', blogRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));