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
      // console.log("Cell exists");
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
      // console.log(results.rows);
    }
  } catch (e) {
    // console.log("parts post error", e);
  }
};

export default PostPartsJob;
