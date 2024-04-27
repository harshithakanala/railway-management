function validateBookSeat(req, res, next) {
    const { trainId, bookedSeats } = req.body;
    if (!trainId || !bookedSeats || bookedSeats <= 0) {
        return res.status(400).json({ error: 'trainId and positive bookedSeats are required' });
    }
    next();
}

module.exports = {
    validateBookSeat
};
