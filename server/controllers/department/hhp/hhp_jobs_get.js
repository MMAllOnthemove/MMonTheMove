import { pool } from "./../../../db.js";

// GET all table info from database

const GetAllJobs = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, unique_id, (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, department, reassign_engineer, parts_list, UPPER(is_qc_checked::text) AS is_qc_checked, qc_comment, date_modified, gspn_status, date_added FROM units WHERE EXTRACT(YEAR FROM date_added::date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY date_modified DESC"
    );
    res.json(rows);
  } catch (err) {}
};

// get job by id
const GetJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT id, unique_id, (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, department, reassign_engineer, parts_list, UPPER(is_qc_checked::text) AS is_qc_checked, qc_comment, date_modified, gspn_status, date_added FROM units WHERE EXTRACT(YEAR FROM date_added::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND id = $1 ORDER BY date_modified DESC",
      [id]
    );
    res.json(rows);
  } catch (err) {
    // 
  }
};
export { GetAllJobs, GetJobById };
