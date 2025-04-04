import jwt from "jsonwebtoken";
import "dotenv/config";

// Generate access token
export function generateAccessToken(user) {
    return jwt.sign(user, `${process.env.JWT_TOKEN_KEY}`, {
        expiresIn: "15m",
    }); // Adjust token expiration as needed
}

// Generate refresh token
export function generateRefreshToken(user) {
    return jwt.sign(user, `${process.env.JWT_TOKEN_KEY}`, {
        expiresIn: "7d",
    });
}
