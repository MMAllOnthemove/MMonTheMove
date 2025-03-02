import "dotenv/config";
const LogoutUser = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure secure flag in production
        });
        res.sendStatus(204);
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Logout failed:", error);
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
export default LogoutUser;
