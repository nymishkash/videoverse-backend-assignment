const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Load your JWT secret from environment variables

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Store user information in request object
        next();
    });
}

module.exports = { authenticateToken };
