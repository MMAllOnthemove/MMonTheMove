import { pool } from "./../../../db.js";

// Get repair jobs
const GetBookingAgentsJobs = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT DISTINCT booking_agent, id, created_date, service_order_no from booking_agents_jobs WHERE booking_agent != 'nigelc01' AND booking_agent != 'shanes300123'"
    );
    res.json(rows);
  } catch (err) {}
};

export default GetBookingAgentsJobs;
