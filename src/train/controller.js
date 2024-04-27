const db = require('../db');

async function addTrain(req, res) {
    const { source, destination, totalSeats } = req.body;
    try {
        await db.query('INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)', [source, destination, totalSeats]);
        res.status(201).json({ message: 'Train added successfully' });
    } catch (error) {
        console.error('Error adding train:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getSeatAvailability(req, res) {
    const { source, destination } = req.query;
    try {
        const [trains] = await db.query('SELECT * FROM trains WHERE source = ? AND destination = ?', [source, destination]);
        if (trains.length === 0) {
            return res.status(404).json({ error: 'No trains found for the given route' });
        }
        const availableTrains = await Promise.all(trains.map(async train => ({
            id: train.id,
            totalSeats: train.total_seats,
            availableSeats: await calculateAvailableSeats(train.id),
        })));
        res.json(availableTrains);
    } catch (error) {
        console.error('Error fetching seat availability:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function calculateAvailableSeats(trainId) {
    try {
        const [bookings] = await db.query('SELECT SUM(booked_seats) AS totalBookedSeats FROM bookings WHERE train_id = ?', [trainId]);
        const [train] = await db.query('SELECT total_seats FROM trains WHERE id = ?', [trainId]);
        const totalBookedSeats = bookings[0].totalBookedSeats || 0;
        const totalSeats = train[0].total_seats;
        const availableSeats = totalSeats - totalBookedSeats;
        return availableSeats >= 0 ? availableSeats : 0;
    } catch (error) {
        console.error('Error calculating available seats:', error);
        return 0;
    }
}

module.exports = {
    addTrain,
    getSeatAvailability
};
