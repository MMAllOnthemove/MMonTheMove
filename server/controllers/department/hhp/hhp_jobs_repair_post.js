import { pool } from "./../../../db.js";

// Post repair jobs
const PostRepairJobs = async (req, res) => {
  const {
    repairServiceOrder,
    repairCreatedDate,
    repairCreatedTime,
    repairModel,
    repairWarranty,
    repairEngineer,
    repairFault,
    repairImei,
    repairSerialNumber,
    repairInHouseStatus,
    repairEngineerAssignDate,
    repairEngineerAssignTime,
    repairEngineerAnalysis,
    repairTicket,
    repairDepartment,
    repairUser,
    dateAdded,
  } = req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT id from units WHERE ticket = $1",
      [repairTicket]
    );
    if (findIfExists.rowCount > 0) {
      res.status(400).json("Ticket already exists!");
    } else {
      await pool.query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *",
        [
          repairServiceOrder,
          repairCreatedDate,
          repairCreatedTime,
          repairModel,
          repairWarranty,
          repairEngineer,
          repairFault,
          repairImei,
          repairSerialNumber,
          repairInHouseStatus,
          repairEngineerAssignDate,
          repairEngineerAssignTime,
          repairEngineerAnalysis,
          repairTicket,
          repairDepartment,
          repairUser,
          dateAdded,
        ]
      );
      res.status(200).json("Job added, thank you!");
    }
  } catch (err) {}
};
export default PostRepairJobs;
