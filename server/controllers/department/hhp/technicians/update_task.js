import { pool } from "../../../../db.js";

export const UpdateTask = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
    if (!id) return;
    const changes = req.body; // Get the changed fields from the frontend
    // Check if there are changes
    if (Object.keys(changes).length === 0) {
        return res.status(400).json({ error: "No changes provided" });
    }

    const keys = Object.keys(changes);
    const values = Object.values(changes);

    // Construct dynamic SQL query for patching only changed values using prepared statements
    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

    // The query with placeholders ($1, $2, ..., $n) for prepared statements
    const query = `UPDATE technician_tasks SET ${setClause} WHERE id = $${
        keys.length + 1
    } RETURNING id`;
    // Add the `id` to the `values` array to use for the WHERE clause
    values.push(id);
    const returnDataWithNewRow =
        "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC";
    try {
        // Execute the prepared statement query
        const result = await pool.query({
            text: query,
            values: values,
        });
        const fetchResult = await pool.query(returnDataWithNewRow, [
            result?.rows[0].id,
        ]);
        // Check if the update was successful
        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ error: "Task not found or no changes made" });
        }
        return res.status(201).json({
            message: "HHP task updated",
            task: fetchResult.rows[0],
        });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Error updating record:", err);
        }
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
