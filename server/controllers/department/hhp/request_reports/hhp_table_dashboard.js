import { pool } from "../../../../db.js";
import { Parser } from "@json2csv/plainjs";
import appLogs from "../../../logs/logs.js";

const getHHPTableDashboardReport = async (req, res) => {
    try {
        const { fromDate, toDate, downloaded_by, downloaded_at } = req.query;
        const fileName = `report_${Date.now()}.csv`;

        const params = [];
        if (!fromDate || !toDate) {
            return res.status(400).json({ message: "Missing date range" });
        }
        params.push(fromDate, toDate);

        const query = `
            SELECT
                t.engineer,

                COUNT(*) FILTER (WHERE t.unit_status = 'New') AS "new_tickets_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'Assigned to Tech') AS "assigned_tickets_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'In Progress') AS "in_progress_tickets_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'Customer Reply') AS "customer_reply_tickets_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'Parts Request 1st Approval') AS "parts_request_tickets_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'Completed') AS "completed_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'For Invoicing') AS "for_invoicing_count",

                COUNT(*) FILTER (WHERE t.unit_status = 'Resolved') AS "resolved_count",

                COUNT(*) FILTER (WHERE t.qc_complete = 'Pass') AS "qc_passed_count",

                COUNT(DISTINCT hqc.id) FILTER (WHERE hqc.qc_complete = 'Fail') AS "qc_failed_count"

            FROM technician_tasks t
            JOIN engineers e ON t.engineer = CONCAT(e.engineer_firstname, ' ', e.engineer_lastname)
            LEFT JOIN hhp_quality_control hqc ON hqc.ticket_number = t.ticket_number AND hqc.qc_complete = 'Fail'
            WHERE t.date_booked BETWEEN $1 AND $2
            GROUP BY t.engineer
            ORDER BY t.engineer;
        `;

        const { rows } = await pool.query(query, params);

        // Log report request
        await pool.query(
            `INSERT INTO reports_download (downloaded_by, downloaded_at, filename) VALUES ($1, $2, $3)`,
            [downloaded_by, downloaded_at, fileName]
        );
        await appLogs("GET", downloaded_by, req.query);

        if (rows.length > 0) {
            const parser = new Parser({ fields: Object.keys(rows[0]) });
            const csvData = parser.parse(rows);

            res.header("Content-Type", "text/csv");
            res.attachment(fileName);
            return res.send(csvData);
        } else {
            return res.status(400).json({ message: "No data found" });
        }
    } catch (err) {
        console.error("Error generating dashboard report:", err);
        return res.status(500).json({
            message: "Error fetching reports",
        });
    }
};

export default getHHPTableDashboardReport;
