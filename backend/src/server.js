require('dotenv').config();
const express = require('express');
const apiRoute = require('./routes/api');
const configViewEngine = require('./config/viewEngine');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8888;

// CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Test API
const webAPI = express.Router();
webAPI.get('/', apiRoute);

//khai báo route
// app.use('/api/hello', apiRoute);
app.use('/', webAPI);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});