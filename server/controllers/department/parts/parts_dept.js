import { pool } from "../../../db.js";

const PostPartsJob = async (req, res) => {
  const {
    service_order,
    warranty,
    model,
    imei,
    fault,
    serial_number,
    engineer,
    dispatchAnalysis,
    inHouseStatus,
    ticket,
    department,
    dispatchBy,
    partsArr,
    dateAdded,
    partsChecked,
    reasonForIncompleteParts,
  } = req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT id from parts_department WHERE service_order = $1",
      [service_order]
    );
    if (findIfExists.rowCount > 0) {
      // Checking the ticket input as it is the one where user puts in info
      res.status(400).json("Service order already exists!");
    } else {
      const results = await pool.query(
        "INSERT INTO parts_department (service_order, warranty, model, imei, fault, serial_number, engineer, dispatch_analysis, in_house_status, ticket, department, dispatch_by, added_by, all_parts, parts_checked, reason_for_incomplete_parts, job_added_date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *",
        [
          service_order,
          warranty,
          model,
          imei,
          fault,
          serial_number,
          engineer,
          dispatchAnalysis,
          inHouseStatus,
          ticket,
          department,
          dispatchBy,
          dispatchBy,
          partsArr,
          partsChecked,
          reasonForIncompleteParts,
          dateAdded,
        ]
      );
      res.status(201).json("Job added, thank you!");
    }
  } catch (e) {}
};
const GetPartsJobs = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, unique_id, service_order, warranty, model, imei, fault, serial_number, engineer, dispatch_analysis, in_house_status, ticket, department, dispatch_by, added_by, all_parts, TO_CHAR(job_added_date::date, 'YYYY-MM-DD') AS job_added_date, parts_checked, reason_for_incomplete_parts, DATE(job_modified_date) AS job_modified_date FROM parts_department ORDER BY job_added_date DESC"
    );
    res.json(rows);
  } catch (error) {}
};

// get job by id
const GetJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM parts_department WHERE id = $1",
      [id]
    );
    res.json(rows);
  } catch (err) {}
};

// Update job by id
const UpdateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatchAnalysis, inHouseStatus, dateModified, dispatchBy } =
      req.body;
    const editQuery = await pool.query(
      "UPDATE parts_department SET dispatch_analysis = $1, in_house_status = $2, job_modified_date = $3, modified_by_who = $4, WHERE id = $5 returning *",
      [dispatchAnalysis, inHouseStatus, dateModified, dispatchBy, id]
    );
    res.json(editQuery.rows);
  } catch (err) {}
};

// Delete job by id
const DeleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query(
      "DELETE FROM parts_department WHERE id = $1",
      [id]
    );
    if (res.status === 200 || res.status === 201) {
      res.send("Deleted successfully");
      res.send(deleteQuery.rows[0]);
    } else if (res.status === 404 || res.status === 405) {
      res.send("Failed to delete");
    }
  } catch (error) {}
};

export { PostPartsJob, GetPartsJobs, GetJobById, UpdateJobById, DeleteJob };
