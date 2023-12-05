const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const RedisClient = require("ioredis");

// Create a `ioredis` client
const client = new RedisClient();
// ... (see https://github.com/luin/ioredis#connect-to-redis)

// Create and use the rate limiter
const limiter = rateLimit({
  // Rate limiter configuration
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Redis store configuration
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args) => client.call(...args),
  }),
});

module.exports = limiter;
