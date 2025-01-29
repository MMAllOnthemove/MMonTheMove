import { pool } from "../../../../db.js";
import { Parser } from "@json2csv/plainjs";

const GetReport = async (req, res) => {
    try {
        const {
            engineer,
            dateFrom,
            dateTo,
            unit_status,
            downloaded_by,
            downloaded_at,
        } = req.query;
        const fileName = `report_${Date.now()}.csv`;
        // Base query
        let query = `
      SELECT date_booked as Booked date, ticket_number as Ticket, model as Model, warranty as Warranty, engineer as Engineer, fault as Fault, imei as IMEI, serial_number as SN, unit_status as Status, assessment_date as Assessment date, parts_issued_date as Parts issued date, in_progress_date as In progress date, assigned_date as Assigned date, qc_date as QC complete date, completed_date as Completed date, parts_requested_date as Parts requested date, collected_date as Collected date  FROM technician_tasks WHERE 1=1
    `;

        // Dynamic filters
        const params = [];
        if (dateFrom && dateTo) {
            params.push(dateFrom, dateTo);
            query += ` AND date_booked BETWEEN $${params.length - 1} AND $${
                params.length
            }`;
        }
        if (engineer) {
            params.push(engineer);
            query += ` AND engineer = $${params.length}`;
        }
        if (unit_status) {
            params.push(unit_status);
            query += ` AND unit_status = $${params.length}`;
        }

        // Query the database
        const { rows } = await pool.query(query, params);

        // Use json2csv to convert JSON to CSV
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(rows);

        // Log the report request
        await pool.query(
            `
      INSERT INTO reports_download (downloaded_by, downloaded_at,filename) VALUES ($1, $2, $3)`,
            [downloaded_by, downloaded_at, fileName]
        );

        res.header("Content-Type", "text/csv");
        res.attachment(fileName);
        res.send(csvData);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message, // Hide detailed error message in production
        });
    }
};
export default GetReport;
