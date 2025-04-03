import { verifyJwtToken } from "./authUtils.js";


// Middleware to authenticate JWT token
// export function authenticateAdmin(req, res, next) {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(401).json({ error: "Please log in" });
//     jwt.verify(token, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
//         if (err) return res.status(403).json({ error: "Not logged in" });
//         if (user.user_role !== "admin")
//             return res.status(403).json({ error: "Not authorized" }); // Check if user is admin
//         req.user = user; // Attach user object to the request
//         next();
//     });
// }
// export function authenticateAdmin(req, res, next) {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(401).json({ error: "Please log in" });

//     const user = verifyJwtToken(token);
//     if (!user) return res.status(403).json({ error: "Not logged in" });
//     if (user.user_role !== "admin")
//         return res.status(403).json({ error: "Not authorized" }); // Check if user is admin
//     req.user = user; // Attach user object to the request
//     next();
// }
export function authenticateAdmin(req, res, next) {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "Please log in" });

    const user = verifyJwtToken(token);
    if (!user) return res.status(403).json({ error: "Not logged in" });
    if (user.user_role !== "admin")
        return res.status(403).json({ error: "Not authorized" }); // Check if user is admin
    req.user = user; // Attach user object to the request
    next();
}
export function authenticateRole(allowedRoles) {
    return (req, res, next) => {
        try {
            const token = req.cookies.accessToken; // Use accessToken instead of refreshToken
            if (!token)
                return res
                    .status(401)
                    .json({ error: "Authentication required" });

            const user = verifyJwtToken(token);
            if (!user)
                return res
                    .status(403)
                    .json({ error: "Invalid or expired token" });

            if (!allowedRoles.includes(user.user_role))
                return res.status(403).json({ error: "Access denied." });

            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };
}
