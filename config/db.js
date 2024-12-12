// Purpose: Connect to MongoDB using Mongoose with environment variable for URI. Log success or error messages accordingly.

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Simplifed connection to MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;