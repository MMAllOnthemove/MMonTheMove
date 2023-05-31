const redisClient = require("../redis")

module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    // console.log("Bad request");
    next(new Error("Not authorized"));
  } else {
    socket.user = { ...socket.request.session.user };
    // This goes into our redis db, creates a hashmap or js object
    // First argument takes in a key, can be anything
    redisClient.hset(`unique_id: ${socket.user.email}`, 
    `unique_id`, socket.user.unique_id
    )
    next();
  }
};
 