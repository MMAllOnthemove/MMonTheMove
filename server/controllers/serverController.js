
const redisClient = require("../redis");
require("dotenv").config();
const session = require("express-session");
const RedisStore = require("connect-redis").default

const sessionMiddleware = session({
  secret: process.env.NEXT_PUBLIC_COOKIE_SECRET,
  credentials: true,
  name: "sid",
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production" ? "true" : "auto",
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
});

const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: process.env.NEXT_PUBLIC_REACT_URL,
  credentials: "true",
};

module.exports = { sessionMiddleware, wrap, corsConfig };