const { rateLimit } = require("express-rate-limit");

// / Rate limit middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You have exceeded your 3 requests per minute limit.",
});
module.exports = limiter;
