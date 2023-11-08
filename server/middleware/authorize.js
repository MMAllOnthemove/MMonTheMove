const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  // /Extracting token from authorization header

  // Removing 'Bearer ' prefix to get the token
  // const token = req.headers["authorization"].split(" ")[1];

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //   //it is going to give use the user id (user:{id: user.id})
    //   const verify = jwt.verify(
    //     token,
    //     process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY
    //   );
    // console.log("verify", verify); // returns {id: '', iat: "", exp: ""}

    jwt.verify(
      token,
      process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY,
      async (err, payload) => {
        if (err) {
          return res.status(403).send("Could not verify token");
        }
        // req.user = verify.user;
        req.user = payload.user;
        // console.log("payload", payload);
        // // console.log("verify", verify);
        // console.log("req.user.id", req.user.id);
        // console.log("req.user", req.user);
        // // console.log("req", req);
      }
    );

    // console.log("req.user", req.user);
    // console.log("verify.user", verify.user);
    next();
  } catch (err) {
    // res.status(401).json({ msg: "Token is not valid" });
  }
};
