const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;