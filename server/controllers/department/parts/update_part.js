import { pool } from "../../../db.js";
import appLogs from "../../logs/logs.js";
<<<<<<< HEAD

=======
import emitLatestPartsAdded from "./emit_latest_parts.js";
>>>>>>> origin/sockets-realtime
export const UpdatePart = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
    if (!id) {
        return res.status(400).json({ error: "Part ID is required" });
    }

    try {
        // Fetch existing part data
        const { rows } = await pool.query(
            "SELECT * FROM parts_for_tasks WHERE id = $1",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Part not found" });
        }

        const existingPart = rows[0]; // The current values in the database
        const changes = req.body; // Incoming updates

        // Filter only changed values
        const updates = {};
        Object.keys(changes).forEach((key) => {
            if (changes[key] !== existingPart[key]) {
                updates[key] = changes[key];
            }
        });

        // If no actual changes, return early
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No changes detected" });
        }

        // Construct dynamic SQL query for updating only changed values
        const keys = Object.keys(updates);
        const values = Object.values(updates);

        const setClause = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");
        values.push(id); // Add `id` as the last parameter for WHERE clause

        const query = `UPDATE parts_for_tasks SET ${setClause} WHERE id = $${
            keys.length + 1
<<<<<<< HEAD
        } RETURNING id`;
=======
        } RETURNING *`;
>>>>>>> origin/sockets-realtime

        // Execute update query
        const result = await pool.query({ text: query, values });

        await appLogs("UPDATE", changes?.updated_by, updates); // Log only changed fields
<<<<<<< HEAD

        return res.status(200).json({ message: "Part updated successfully" });
    } catch (err) {
        console.error("Error updating part:", err);
=======
        emitLatestPartsAdded();
        return res.status(200).json({
            message: "Part updated successfully",
            part: result.rows[0],
        });
    } catch (err) {
>>>>>>> origin/sockets-realtime
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
