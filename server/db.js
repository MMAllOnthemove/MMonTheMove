import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  user: process.env.NEXT_PUBLIC_DB_USER,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  port: process.env.NEXT_PUBLIC_DB_PORT,
});

export { pool };
