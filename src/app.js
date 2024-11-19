const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối cơ sở dữ liệu
connectDB();

app.use('/',userRoute);
module.exports = app;