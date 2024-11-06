import { pool } from "../../../../db.js";

export const UpdateTask = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
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
    } RETURNING *`;

    // Add the `id` to the `values` array to use for the WHERE clause
    values.push(id);

    try {
        // Execute the prepared statement query
        const result = await pool.query({
            text: query,
            values: values,
        });
        res.status(201).json({
            message: "HHP task updated",
        });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Error updating record:", err);
        }

        res.status(500).json({ error: "Database error" });
    }
};
