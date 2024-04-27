function validateRegisterUser(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password ) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    next();
}

function validateLoginUser(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    next();
}

module.exports = {
    validateRegisterUser,
    validateLoginUser
};
