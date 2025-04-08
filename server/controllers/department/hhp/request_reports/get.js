import { pool } from "../../../../db.js";
import { Parser } from "@json2csv/plainjs";
import appLogs from "../../../logs/logs.js";

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
<<<<<<< HEAD
        // Base query
        let query = `
      SELECT date_booked as Booked date, ticket_number as Ticket, model as Model, warranty as Warranty, engineer as Engineer, fault as Fault, imei as IMEI, serial_number as SN, unit_status as Status, assessment_date as Assessment date, parts_issued_date as Parts issued date, in_progress_date as In progress date, assigned_date as Assigned date, qc_date as QC complete date, completed_date as Completed date, parts_requested_date as Parts requested date, collected_date as Collected date  FROM technician_tasks WHERE 1=1
    `;
=======

        // Base query
        let query = `
            SELECT date_booked as "Booked date", ticket_number as Ticket, model as Model, warranty as Warranty, engineer as Engineer, fault as Fault, imei as IMEI, serial_number as SN, unit_status as Status, assessment_date as "Assessment date", parts_issued_date as "Parts issued date", in_progress_date as "In progress date", assigned_date as "Assigned date", qc_date as "QC complete date", completed_date as "Completed date", parts_requested_date as "Parts requested date", collected_date as "Collected date"  FROM technician_tasks WHERE 1=1
        `;
>>>>>>> origin/sockets-realtime

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

<<<<<<< HEAD
        // Use json2csv to convert JSON to CSV
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(rows);

        // Log the report request
        await pool.query(
            `
      INSERT INTO reports_download (downloaded_by, downloaded_at,filename) VALUES ($1, $2, $3)`,
            [downloaded_by, downloaded_at, fileName]
        );
        await appLogs("INSERT", downloaded_by, req.query);

        res.header("Content-Type", "text/csv");
        res.attachment(fileName);
        res.send(csvData);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message, // Hide detailed error message in production
=======
        // Log the report request
        await pool.query(
            `
            INSERT INTO reports_download (downloaded_by, downloaded_at,filename) VALUES ($1, $2, $3)`,
            [downloaded_by, downloaded_at, fileName]
        );
        await appLogs("GET", downloaded_by, req.query);

        if (rows.length > 0) {
            // Use json2csv to convert JSON to CSV
            const json2csvParser = new Parser({
                fields: Object.keys(rows[0]),
            });
            const csvData = json2csvParser.parse(rows);

            res.header("Content-Type", "text/csv");
            res.attachment(fileName);
            return res.send(csvData);
        } else {
            // Handle the case where rows is empty
            return res.status(400).json({ message: "No data found" });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching reports",
>>>>>>> origin/sockets-realtime
        });
    }
};
export default GetReport;
