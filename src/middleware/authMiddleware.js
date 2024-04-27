const jwt = require('jsonwebtoken');

function authenticateAdmin(req, res, next) {
    const apiKey = req.header('X-API-Key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

function authenticateUser(req, res, next) {
    const authToken = req.header('Authorization');
    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = {
    authenticateAdmin,
    authenticateUser
};
