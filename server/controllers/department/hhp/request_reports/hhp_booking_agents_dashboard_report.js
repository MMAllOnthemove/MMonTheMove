import { pool } from "../../../../db.js";
import { Parser } from "@json2csv/plainjs";
import appLogs from "../../../logs/logs.js";

const getHHPBookingAgentsDashboardReport = async (req, res) => {
    try {
        const { dateFrom, dateTo, downloaded_by, downloaded_at } = req.query;
        const fileName = `report_${Date.now()}.csv`;

        const params = [];
        if (!dateFrom || !dateTo) {
            return res.status(400).json({ message: "Missing date range" });
        }
        params.push(dateFrom, dateTo);

          let query = `
SELECT 
    bat.booking_agent,
    COUNT(bat.id) AS total_tasks,
   
    -- General warranty counts
    SUM(CASE 
        WHEN tt.warranty IN ('IW', 'IN WARRANTY', '75130', '69476') THEN 1 
        ELSE 0 
    END) AS in_warranty_count,

    SUM(CASE 
        WHEN tt.warranty IN ('OOW', 'OUT OF WARRANTY', '75131', '69477') THEN 1 
        ELSE 0 
    END) AS out_of_warranty_count,

    -- In warranty count where store is 'dunoworx'
    SUM(CASE 
        WHEN tt.warranty IN ('IW', 'IN WARRANTY', '75130', '69476') AND tt.stores = 'Dunoworx (HHP)' THEN 1 
        ELSE 0 
    END) AS dunoworx_in_warranty,

    -- Out of warranty count where store is 'dunoworx'
    SUM(CASE 
        WHEN tt.warranty IN ('OOW', 'OUT OF WARRANTY', '75131', '69477') AND tt.stores = 'Dunoworx (HHP)' THEN 1 
        ELSE 0 
    END) AS dunoworx_out_of_warranty,

    -- In warranty count where store is 'dsv'
    SUM(CASE 
        WHEN tt.warranty IN ('IW', 'IN WARRANTY', '75130', '69476') AND tt.stores = 'HHP (DSV)' THEN 1 
        ELSE 0 
    END) AS dsv_in_warranty,

    -- Out of warranty count where store is 'dsv'
    SUM(CASE 
        WHEN tt.warranty IN ('OOW', 'OUT OF WARRANTY', '75131', '69477') AND tt.stores = 'HHP (DSV)' THEN 1 
        ELSE 0 
    END) AS dsv_out_of_warranty

FROM booking_agents_tasks bat
LEFT JOIN technician_tasks tt ON bat.ticket_number = tt.ticket_number
-- LEFT JOIN techs ON tt.technician_id = techs.id  -- adjust join key if different
WHERE tt.date_booked BETWEEN $1 AND $2
GROUP BY bat.booking_agent
ORDER BY bat.booking_agent;

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

export default getHHPBookingAgentsDashboardReport;
