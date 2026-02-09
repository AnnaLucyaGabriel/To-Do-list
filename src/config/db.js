const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nsdc");
        console.log("db is connected");
    } catch (err) {
        console.error("db connection failed");
        console.error(err);
        process.exit(1);
    }
};
module.exports = connectDB;
