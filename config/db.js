const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected on ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB connection error : ${error}`.bgRed.white)
    }
}

module.exports = connectDB;