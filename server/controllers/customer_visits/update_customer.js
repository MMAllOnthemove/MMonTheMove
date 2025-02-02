import { pool } from "../../db.js";
import appLogs from "../logs/logs.js";

export const UpdateCustomer = async (req, res) => {
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
    const query = `UPDATE customers SET ${setClause} WHERE id = $${
        keys.length + 1
    } RETURNING id`;
    // Add the `id` to the `values` array to use for the WHERE clause
    values.push(id);

    try {
        // Execute the prepared statement query
        const result = await pool.query({
            text: query,
            values: values,
        });
        await appLogs("UPDATE", "", changes);
        // Check if the update was successful
        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ error: "Customer not found or no changes made" });
        }
        return res.status(201).json({
            message: "Customer updated",
        });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Error updating record:", err);
        }
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
