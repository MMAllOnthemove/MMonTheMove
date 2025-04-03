import "dotenv/config";
import { pool } from "../../../../db.js";

// Post repair jobs
const AddToQCTable = async (req, res) => {
    const { ticket_number, qc_complete, qc_comment, created_at, created_by } =
        req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO hhp_quality_control (ticket_number, qc_complete, reason, created_at, created_by) values ($1, $2, $3, $4, $5)",
            [ticket_number, qc_complete, qc_comment, created_at, created_by]
        );
        return res.status(200).json("Added TO QC TABLE");
    } catch (error) {
        onsole.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export default AddToQCTable;
