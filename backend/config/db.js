const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // .env file se MONGODB_URI hasil karein
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Agar connection fail hojaye to process ko band kar dein
        process.exit(1);
    }
};

module.exports = connectDB;