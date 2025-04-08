import jwt from "jsonwebtoken";
import "dotenv/config";

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign(user, `${process.env.JWT_TOKEN_KEY}`, {
        expiresIn: "15m",
    }); // Adjust token expiration as needed
};

// Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign(user, `${process.env.JWT_TOKEN_KEY}`, {
        expiresIn: "7d",
    });
};
export { generateAccessToken, generateRefreshToken };
