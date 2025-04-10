import "dotenv/config";
import { generateAccessToken } from "../utils/token_generate.js";

export const RefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token not provided" });

  // if (!refreshTokens.includes(refreshToken))
  //   return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(refreshToken, `${process.env.JWT_TOKEN_KEY}`, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken });
  });
};
