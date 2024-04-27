const express = require('express');
const router = express.Router();
const { bookSeat, getBookingDetails } = require('../bookings/controller');
const { validateBookSeat } = require('../bookings/validator');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/book', authenticateUser, validateBookSeat, bookSeat);
router.get('/details', authenticateUser, getBookingDetails);

module.exports = router;
