import { pool } from "./../../../db.js";

const PostBookingAgentsJobs = async (req, res) => {
  const {
    serviceOrder,
    createdDate,
    createdTime,
    warranty,
    bookingAgent,
    userData,
  } = req.body;

  try {
    const findIfExists = await pool.query(
      "SELECT id from booking_agents_jobs where service_order_no = $1",
      [serviceOrder]
    );
    if (findIfExists.rowCount > 0 || bookingAgent === "") {
      res.status(400).json("Job already exists! or no agent name");
    } else {
      await pool.query(
        "INSERT INTO booking_agents_jobs (service_order_no, created_date, created_time, warranty, booking_agent, added_by) values ($1, $2, $3, $4, $5, $6) returning *",
        [
          serviceOrder,
          createdDate,
          createdTime,
          warranty,
          bookingAgent,
          userData,
        ]
      );
      res.status(200).json("Job added, thank you!");
    }
  } catch (err) {}
};

export default PostBookingAgentsJobs;
