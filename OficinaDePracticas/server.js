const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();


connectDB();


app.use(express.json({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/event', require('./routes/crearevent'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
