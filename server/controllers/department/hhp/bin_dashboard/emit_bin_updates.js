import { pool } from "../../../../db.js";
import { io } from "../../../../services/io.js";
const emitBinStatsUpdate = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT engineer, unit_status, COUNT(*)::INTEGER AS units_count, 
                ARRAY_AGG(
                    jsonb_build_object('ticket_number', ticket_number, 'ticket_id', repairshopr_job_id) 
                    ORDER BY date_booked DESC
                ) AS tickets 
            FROM technician_tasks 
            WHERE unit_status IN ('New', 'In Progress', 'Customer Reply', 'Assigned to Tech', 
                                  'Parts Request 1st Approval', 'Parts to be ordered', 'Waiting for Parts') 
            GROUP BY engineer, unit_status 
            ORDER BY engineer, unit_status;
        `);
        io.emit("binStatsUpdated", rows);
    } catch (err) {
        if (process.env.NODE_ENV !== "production")
            console.log("Error emitting bin stats update:", err);
    }
};
export default emitBinStatsUpdate;
