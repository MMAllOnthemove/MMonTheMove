import { pool } from "./../../../db.js";
import * as Yup from "yup";

const bookingAgentsSchema = Yup.object().shape({
  serviceOrder: Yup.string()
    .min(10, "Service order is 10 digits!")
    .max(10, "Service order is 10 digits!")
    .required("Service Order is required!"),
  createdDate: Yup.string(),
  createdTime: Yup.string(),
  warranty: Yup.string(),
  bookingAgent: Yup.string().required("Please select booking agent"),
  agentEmail: Yup.string()
    .email("Email is invalid!")
    .required("Email is required!"),
});

const PostBookingAgentsJobs = async (req, res) => {
  const {
    serviceOrder,
    createdDate,
    createdTime,
    warranty,
    bookingAgent,
    agentEmail,
  } = req.body;

  try {
    await bookingAgentsSchema.validate(req.body);
    const findIfExists = await pool.query(
      "SELECT id from booking_agents_jobs where service_order_no = $1",
      [serviceOrder]
    );
    if (findIfExists.rows.length > 0) {
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
          agentEmail,
        ]
      );
      res.status(201).json("Successfully created!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export default PostBookingAgentsJobs;
