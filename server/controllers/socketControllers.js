// const redisClient = require("../redis");
const { jwtVerify } = require("./jwt/jwtAuth");
require("dotenv").config();

const authorizeUser = (socket, next) => {
  // if (!socket.request.session || !socket.request.session.user) {
  //   console.log("Bad request!");
  //   next(new Error("Not authorized"));
  // } else {
  //   socket.user = { ...socket.request.session.user };
  //   redisClient.hset(
  //     `userid:${socket.user.email}`,
  //     "userid",
  //     socket.user.unique_id
  //   );
  //   next();
  // }

  const token = socket.handshake.auth.token;
  jwtVerify(token, process.env.JWT_SECRET_KEY)
    .then((decoded) => {
      socket.user = { ...decoded };
      next();
    })
    .catch((err) => {
      console.log("Bad request!", err);
      next(new Error("Not authorized"));
    });
};
module.exports = authorizeUser;
