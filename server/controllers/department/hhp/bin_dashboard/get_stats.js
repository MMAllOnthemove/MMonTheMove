import { pool } from "../../../../db.js";
const GetBinStats = async (req, res) => {
    try {
        const { rows } = await pool.query(
            //             `SELECT engineer, date_booked, unit_status, COUNT(*)::INTEGER AS units_count,
            //        ARRAY_AGG(
            //            jsonb_build_object('ticket_number', ticket_number, 'ticket_id', repairshopr_job_id)
            //            ORDER BY date_booked DESC
            //        ) AS tickets
            // FROM technician_tasks
            // WHERE unit_status IN ('New', 'In Progress', 'Customer Reply', 'Assigned to Tech',
            //                       'Parts Request 1st Approval', 'Parts to be ordered', 'Waiting for Parts')
            // GROUP BY engineer, unit_status
            // ORDER BY engineer, unit_status;
            // `
            `
SELECT 
    engineer, 
    date_booked, 
    unit_status,
    CASE 
        WHEN CURRENT_DATE - date_booked::date <= 0 THEN 
            CONCAT(EXTRACT(HOUR FROM NOW() - date_booked::date), ' hours')
        ELSE 
            CONCAT(CURRENT_DATE - date_booked::date, ' days')
    END AS difference_overall,
    COUNT(*)::INTEGER AS units_count, 
    ARRAY_AGG(
        jsonb_build_object(
            'ticket_number', ticket_number, 
            'ticket_id', repairshopr_job_id,
            'date_booked', date_booked,
            'difference', 
                CASE 
                    WHEN CURRENT_DATE - date_booked::date <= 0 THEN 
                        CONCAT(EXTRACT(HOUR FROM NOW() - date_booked::date), ' hours')
                    ELSE 
                        CONCAT(CURRENT_DATE - date_booked::date, ' days')
                END
        ) 
        ORDER BY date_booked DESC
    ) AS tickets 
FROM technician_tasks 
WHERE unit_status IN ('New', 'In Progress', 'Customer Reply', 'Assigned to Tech', 
                      'Parts Request 1st Approval', 'Parts to be ordered', 'Waiting for Parts') 
GROUP BY engineer, unit_status, date_booked;


`
        );

        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get bin stats" });
    }
};

export default GetBinStats;
