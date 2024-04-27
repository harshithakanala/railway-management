const express = require('express');
const router = express.Router();
const { addTrain, getSeatAvailability } = require('../train/controller');
const { validateAddTrain } = require('../train/validator');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/add', authenticateAdmin, validateAddTrain, addTrain);
router.get('/availability', getSeatAvailability);

module.exports = router;
