import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
export function authenticateToken(req, res, next) {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "Token missing" });
    jwt.verify(token, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
        if (err) return res.status(403).json({ error: "Not logged in" });
        req.user = user; // Attach user object to the request
        next();
    });
}
