function validateAddTrain(req, res, next) {
    const { source, destination, totalSeats } = req.body;
    if (!source || !destination || !totalSeats) {
        return res.status(400).json({ error: 'Source, destination, and totalSeats are required' });
    }
    next();
}

module.exports = {
    validateAddTrain
};
