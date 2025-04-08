import { pool } from "../../../../db.js";
import { Parser } from "@json2csv/plainjs";
import appLogs from "../../../logs/logs.js";

const query = `
SELECT
  t.engineer,

  COUNT(*) FILTER (WHERE t.unit_status = 'New') AS "new_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'New') AS "New",

  COUNT(*) FILTER (WHERE t.unit_status = 'In Progress') AS "In Progress_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'In Progress') AS "In Progress_tickets",

  COUNT(*) FILTER (WHERE t.qc_complete = 'Pass') AS "qc_passed_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.qc_complete = 'Pass') AS "Completed"

COUNT(*) FILTER (WHERE t.qc_complete = 'Pass') AS "qc_failed_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.qc_complete = 'Pass') AS "Completed"

FROM technician_tasks t
JOIN engineers e ON t.engineer = CONCAT(e.engineer_firstname, ' ', e.engineer_lastname)
WHERE t.date_booked BETWEEN $1 AND $2
GROUP BY t.engineer
ORDER BY t.engineer;
`;

// In your HHPDashboardTable handler
const HHPDashboardTable = async (req, res) => {
    console.log("HHPDashboardTable handler reached!");
    const { from, to } = req.query;
    console.log("From:", from, "To:", to); // Log query parameters

    try {
        const results = await pool.query(query, [from, to]);
        return res.json(results.rows); // Ensure you're sending the correct data
    } catch (error) {
        console.error("Error in query:", error);
        return res.status(500).json({ message: "Error occurred" });
    }
};

export default HHPDashboardTable;
