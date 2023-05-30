const Pool = require('pg').Pool
require("dotenv").config();


const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  host: process.env.NEXT_PUBLIC_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  port: process.env.NEXT_PUBLIC_PORT,
});

module.exports = pool;