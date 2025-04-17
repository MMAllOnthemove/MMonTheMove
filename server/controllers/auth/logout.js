import "dotenv/config";
import { verifyJwtToken } from "../../middleware/authUtils.js";
import { pool } from "../../db.js";
const LogoutUser = async (req, res) => {
    // try {
    //     res.clearCookie("refreshToken", {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === "production", // Ensure secure flag in production
    //     });
    //     res.sendStatus(204);
    // } catch (error) {
    //     if (process.env.NODE_ENV !== "production") {
    //         console.error("Logout failed:", error);
    //     }
    //     res.status(500).json({ message: "Internal server error" });
    // }
    try {
        // Get the refresh token from the cookies
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token found" });
        }

        // Optional: Check if the refresh token is valid (or expired)
        const user = verifyJwtToken(refreshToken);
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Clear both access and refresh tokens
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        // Optional: Invalidate the refresh token in the database (if you want to implement token revocation)
        await pool.query("DELETE FROM tokens WHERE user_id = $1", [
            user.user_id,
        ]);

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default LogoutUser;
