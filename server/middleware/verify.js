import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
export function authenticateToken(req, res, next) {
    const token = req.cookies.refreshToken;
    jwt.verify(token, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Attach user object to the request
        next();
    });
}
