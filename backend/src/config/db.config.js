const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
        console.log('MongoDB connected 🥰');
    } catch (error) {
        console.log('MongoDB connection failed 😢');
        console.log(error);
    }
}

module.exports = connectDB;