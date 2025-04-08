// authUtils.js
import jwt from "jsonwebtoken";
import "dotenv/config";
/**
 * Verifies the JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} - The decoded user object if the token is valid, or null if invalid.
 */
export const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_TOKEN_KEY); // Use your environment variable
    } catch (err) {
        return null;
    }
};
