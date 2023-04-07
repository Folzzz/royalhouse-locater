const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// custom modules
const locateRoutes = require('./routes/locateRoutes');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

// initialize
const PORT = process.env.PORT || 5000;
const app = express();
// connect db
connectDB();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable cors
app.use(cors());
// access control middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/api/v1', locateRoutes);

app.listen(PORT, () => console.log(`SERVER running in ${process.env.NODE_ENV} mode on port ${PORT}`));