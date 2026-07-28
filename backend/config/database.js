const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDatabase;