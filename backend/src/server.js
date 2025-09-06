require('dotenv').config();
const express = require('express');
const apiRoute = require('./routes/api');
const configViewEngine = require('./config/viewEngine');

const app = express();
const PORT = process.env.PORT || 8888;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Test API
const webAPI = express.Router();
webAPI.get('/', apiRoute);

//khai báo route
// app.use('/api/hello', apiRoute);
app.use('/', apiRoute);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});