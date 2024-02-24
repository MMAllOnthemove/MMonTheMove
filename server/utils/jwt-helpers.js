import jwt from "jsonwebtoken";
import "dotenv/config";

function JwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY, {
    expiresIn: "1h",
  });
}

export default JwtGenerator;
