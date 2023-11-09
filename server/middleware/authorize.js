const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  // const authValue = req.headers.authorization;
  // const token = authValue?.replace("Bearer ", "");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY
    );

    req.user = verify.user;
    // console.log("req.user", req.user);
    // console.log("verify.user", verify.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
