import { verifyJwtToken } from "./authUtils.js";


// Middleware to authenticate JWT token

export function authenticateRole(allowedRoles) {
    return (req, res, next) => {
        try {
            const token = req.cookies.refreshToken; 
            if (!token)
                return res.status(401).json({ error: "Please log in" });

            const user = verifyJwtToken(token);
            if (!user)
                return res.status(403).json({ error: "Not logged in" });

            if (!allowedRoles.includes(user.user_role))
                return res.status(403).json({ error: "Access denied." });

            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };
}
