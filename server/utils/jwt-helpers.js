const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  //the code below was the code written from the tutorial
  //Look at file server/routes/dashboard.js to see the change code for this code

  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };

  return jwt.sign(payload, process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY, {
    expiresIn: "1h",
  });
}

module.exports = { jwtGenerator };
