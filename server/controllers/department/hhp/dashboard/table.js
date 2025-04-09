import { pool } from "../../../../db.js";
import { Parser } from "@json2csv/plainjs";
import appLogs from "../../../logs/logs.js";

const query = `
SELECT
  t.engineer,

  COUNT(*) FILTER (WHERE t.unit_status = 'New') AS "new_tickets_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'New') AS "new_tickets",

  COUNT(*) FILTER (WHERE t.unit_status = 'Assigned to Tech') AS "assigned_tickets_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'Assigned to Tech') AS "assigned_tickets",

  COUNT(*) FILTER (WHERE t.unit_status = 'In Progress') AS "in_progress_tickets_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'In Progress') AS "in_progress_tickets",

  COUNT(*) FILTER (WHERE t.unit_status = 'Customer Reply') AS "customer_reply_tickets_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'Customer Reply') AS "customer_reply_tickets",

    COUNT(*) FILTER (WHERE t.unit_status = 'Parts Request 1st Approval') AS "parts_request_tickets_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'Parts Request 1st Approval') AS "parts_request_tickets",

  COUNT(*) FILTER (WHERE t.unit_status = 'Completed') AS "Completed",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'Completed') AS "Completed_tickets",

  COUNT(*) FILTER (WHERE t.unit_status = 'For Invoicing') AS "for_invoicing_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'For Invoicing') AS "for_invoicing_tickets",

  COUNT(*) FILTER (WHERE t.unit_status = 'Resolved') AS "resolved_count",
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.unit_status = 'Resolved') AS "resolved_tickets",

  COUNT(*) FILTER (WHERE t.qc_complete = 'Pass') AS qc_passed_count,
  ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'ticket_number', t.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer
    )
  ) FILTER (WHERE t.qc_complete = 'Pass') AS qc_passed_tickets,

  -- ✅ QC Failed Count
  COUNT(hqc.*) FILTER (WHERE hqc.qc_complete = 'Fail') AS qc_failed_count,

  -- ✅ QC Failed Tickets Array with Reason
  ARRAY_AGG(
    DISTINCT JSONB_BUILD_OBJECT(
      'ticket_number', hqc.ticket_number,
      'date_booked', t.date_booked,
      'unit_status', t.unit_status,
      'engineer', t.engineer,
      'fail_reason', hqc.reason
    )
  ) FILTER (WHERE hqc.qc_complete = 'Fail') AS qc_failed_tickets

FROM technician_tasks t
JOIN engineers e ON t.engineer = CONCAT(e.engineer_firstname, ' ', e.engineer_lastname)
LEFT JOIN hhp_quality_control hqc ON hqc.ticket_number = t.ticket_number AND hqc.qc_complete = 'Fail'

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
