import "dotenv/config";
import { pool } from "../../../../db.js";

// Post repair jobs
const addToQCTable = async (
    ticket_number,
    qc_complete,
    qc_comment,
    engineer,
    created_at,
    created_by
) => {
    try {
        const { rows } = await pool.query(
            "INSERT INTO hhp_quality_control (ticket_number, qc_complete, reason, created_at, engineer, created_by) values ($1, $2, $3, $4, $5, $6)",
            [
                ticket_number,
                qc_complete,
                qc_comment,
                created_at,
                engineer,
                created_by,
            ]
        );
    } catch (error) {
        console.log(error);
    }
};
export default addToQCTable;
