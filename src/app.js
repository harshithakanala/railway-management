const express = require('express');
const bodyParser = require('body-parser');
const { authenticateAdmin } = require('./middleware/authMiddleware');
const trainRoutes = require('./train/router');
const bookingRoutes = require('./bookings/router');
const userRoutes = require('./user/router');

require('dotenv').config();
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/admin', authenticateAdmin);

app.use('/api/train', trainRoutes);

app.use('/api/bookings', bookingRoutes);

app.use('/api/user', userRoutes);

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
