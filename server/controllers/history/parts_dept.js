import { pool } from "../../db.js";

const PostPartsJobHistory = async (req, res) => {
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
    dateModified,
    partsChecked,
    reasonForIncompleteParts,
  } = req.body;
  try {
    //  Here we do not check if job exists as we want history of every change
    await pool.query(
      "INSERT INTO parts_department_history (service_order, warranty, model, imei, fault, serial_number, engineer, dispatch_analysis, in_house_status, ticket, department, dispatch_by, added_by, all_parts, parts_checked, reason_for_incomplete_parts, job_added_date, job_modified_date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) returning *",
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
        dateModified,
      ]
    );
    res.status(201).json("Job added, thank you!");
  } catch (e) {
    // console.log("parts post history error", e);
  }
};
const GetPartsJobsHistory = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM parts_department_history");
    res.json(rows);
  } catch (error) {
    console.log(err);
  }
};
export { PostPartsJobHistory, GetPartsJobsHistory };
