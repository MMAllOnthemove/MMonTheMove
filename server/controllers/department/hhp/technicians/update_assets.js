import { pool } from "../../../../db.js";
import appLogs from "../../../logs/logs.js";

export const updateAssets = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
    const { imei, model, serial_number, updated_by, ticket_number } = req.body; // Get the changed fields from the frontend
    if (!id) return;
    try {
        const query = await pool.query(
            "UPDATE technician_tasks SET imei = $1, model = $2, serial_number = $3 WHERE id = $4 returning id",
            [imei, model, serial_number, id]
        );
        const returnDataWithNewRow =
            "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC";
        const fetchResult = await pool.query(returnDataWithNewRow, [
            query?.rows[0]?.id,
        ]);
        const updatedTask = fetchResult.rows[0];
        await appLogs("UPDATE", updated_by, req.body, ticket_number);
        return res.status(200).json({
            message: "HHP assets updated",
            task: updatedTask,
        });
    } catch (error) {
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
