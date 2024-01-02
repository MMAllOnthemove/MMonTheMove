import jwt from "jsonwebtoken";
import "dotenv/config";

function JwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };
  // const maxAge = 3 * 24 * 60 * 1; // 3 days
  return jwt.sign(payload, process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY, {
    expiresIn: "1h",
  });
}

export default JwtGenerator;
