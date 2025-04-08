import { pool } from "../../../db.js";
import { io } from "../../../services/io.js";
import "dotenv/config";
const emitLatestPartsAdded = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT id, unique_id, ticket_number, part_name, part_desc, 
                    seal_number, part_quantity, parts_status, created_at, 
                    compensation, part_issued, created_by, updated_at, credit_req_number
             FROM parts_for_tasks
             ORDER BY created_at DESC`
        );
        io.emit("emitLatestPartsAdded", rows);
    } catch (err) {
        if (process.env.NODE_ENV !== "production")
            console.error("Error fetching socket parts for task:", err);
    }
};

export default emitLatestPartsAdded;
