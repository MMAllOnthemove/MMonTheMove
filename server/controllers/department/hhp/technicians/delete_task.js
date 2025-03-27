import { pool } from "../../../../db.js";
import { io } from "../../../../services/io.js";
import emitBinStatsUpdate from "../bin_dashboard/emit_bin_updates.js";

const deleteHHPTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    if (!id) return;
    try {
        const getTicketRow = await pool.query(
            "SELECT ticket_number from technician_tasks WHERE id = $1 limit 1",
            [id]
        );
        const matchUser = await pool.query(
            "SELECT email from company_people WHERE user_unique_id = $1 limit 1",
            [userId]
        );
        // Delete the task and return the deleted row
        const { rows } = await pool.query(
            "DELETE FROM technician_tasks WHERE id = $1 returning *",
            [id]
        );
        // Emit the deletion event to clients
        io.emit("deleteTask", {
            taskId: id,
            deletedBy: matchUser?.rows[0]?.email,
            ticket_number: getTicketRow.rows[0]?.ticket_number,
        });
        await emitBinStatsUpdate(); // Emit bin stats update
        return res.status(200).json({
            message: "Successfully deleted!",
            task: getTicketRow.rows[0],
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default deleteHHPTask;
