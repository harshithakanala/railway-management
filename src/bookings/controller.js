const db = require('../db');
const { getSeatAvailability } = require('../train/controller'); 

async function bookSeat(req, res) {
    const { userId } = req.user;
    const { trainId, bookedSeats } = req.body;
    
    try {
        await db.query('START TRANSACTION');

        await db.query('SELECT * FROM bookings WHERE train_id = ? FOR UPDATE', [trainId]);

        const availableTrains = await getSeatAvailability(req, res);

        if (!availableTrains || availableTrains.length === 0) {
            await db.query('ROLLBACK'); // Rollback transaction
            return res.status(404).json({ error: 'No trains found for the given route' }); 
        }

        const train = availableTrains.find(train => train.id === trainId);

        if (!train || train.availableSeats < bookedSeats) {
            await db.query('ROLLBACK'); 
            return res.status(400).json({ error: 'Insufficient seats available' }); 
        }

        await db.query('INSERT INTO bookings (user_id, train_id, booked_seats) VALUES (?, ?, ?)', [userId, trainId, bookedSeats]);

        await db.query('COMMIT');

        res.status(201).json({ message: 'Seat(s) booked successfully' }); 
    } catch (error) {
        console.error('Error booking seat:', error);
        await db.query('ROLLBACK'); 
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
}

async function getBookingDetails(req, res) {
    const { userId } = req.user;
    try {
        const [bookings] = await db.query('SELECT * FROM bookings WHERE user_id = ?', [userId]);
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    bookSeat,
    getBookingDetails
};
