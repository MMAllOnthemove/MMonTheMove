import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
export function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  // if (token == null) return res.sendStatus(401);
  const token = req.cookies.refreshToken;
  jwt.verify(token, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // Attach user object to the request
    next();
  });
}
