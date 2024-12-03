const mongoose = require("mongoose")

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI
    await mongoose.connect(mongoURI)
    console.log("Connected to DB")
}

module.exports = connectDB