import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
export function authenticateAdmin(req, res, next) {
  const token = req.cookies.refreshToken;

  jwt.verify(token, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
    if (err) return res.sendStatus(403);
    if (!user.user_role === "admin") return res.sendStatus(403); // Check if user is admin
    req.user = user; // Attach user object to the request
    next();
  });
}
