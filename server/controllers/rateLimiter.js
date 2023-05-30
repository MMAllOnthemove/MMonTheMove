

const rateLimiter = (secondsLimit, limitAmount) => async (req, res, next)=> {
     const ip =  req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    //  Key will be the ip address, inc means increment if the ip does not exist
    // also expires after 60 seconds
    // counter resets every minute
    // you have a minute to try 10 attempt before redis deletes key value from database and user has to restart
    // .exec() executes the multiple queries
      [response] = await redisClient
     .multi()
     .incr(ip)
     .expire(ip, secondsLimit)
     .exec();
     if (response[1] > limitAmount)
     res.json({
       loggedIn: false,
       status: "Slow down!! Try again in a minute.",
     });
   else next();
};

module.exports = rateLimiter;