const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();


connectDB();


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
