import { pool } from "../../db.js";
import "dotenv/config";

const getBookingAgentsTasks = async (req, res) => {
    try {
        const { from, to } = req.query;

        let query = `
SELECT 
    bat.booking_agent,
    COUNT(bat.id) AS total_tasks,
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'ticket_number', bat.ticket_number,
            'ticket_id', tt.id,
            'date_booked', tt.date_booked,
            'warranty', tt.warranty
        )
    ) AS tickets,

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

        const results = await pool.query(query, [from, to]);
        return res.status(200).json(results.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message,
        });
    }
};

export default getBookingAgentsTasks;
