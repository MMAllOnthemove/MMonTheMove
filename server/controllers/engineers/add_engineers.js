import { pool } from "../../db.js";
import * as Yup from "yup";

const addEngineerSchema = Yup.object({
    engineer_firstname: Yup.string(),
    engineer_lastname: Yup.string(),
    engineer_code: Yup.string().required("Type engineer code"),
    department: Yup.string(),
    created_at: Yup.string(),
});
// Utility function to split names
const splitName = (fullName) => {
    const parts = fullName?.trim()?.split(" ");
    if (parts?.length === 1) {
        return { firstname: parts[0], lastname: "" };
    } else if (parts?.length === 2) {
        return { firstname: parts[0], lastname: parts[1] };
    } else {
        const lastname = parts?.pop(); // The last word is the last name
        return { firstname: parts?.join(" "), lastname };
    }
};

const addEngineers = async (req, res) => {
    const { names } = req.body; // Expecting an array of objects with `name` and `code`

    if (!Array.isArray(names) || names?.length === 0) {
        return res.status(400).json({ error: "Invalid input" });
    }
    try {
        // Extract codes for querying existing engineers
        const codesToCheck = names?.map((entry) => entry.Engineer);
        // Query to check existing engineers by code
        const existingEngineersQuery = `
      SELECT engineer_code
      FROM engineers
      WHERE engineer_code = ANY ($1::text[])
    `;
        const { rows: existingEngineers } = await pool.query(
            existingEngineersQuery,
            [codesToCheck]
        );
        // Create a Set of existing engineer codes for quick lookup
        const existingCodesSet = new Set(
            existingEngineers.map((e) => e.engineer_code)
        );
        // Filter new engineers (those whose codes do not exist)
        const newEngineers = names.filter(
            (entry) => !existingCodesSet.has(entry.Engineer)
        );
        if (newEngineers.length > 0) {
            const insertQuery = `
            INSERT INTO engineers (engineer_firstname, engineer_lastname, engineer_code, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
          `;
            const currentDate = new Date(
                Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
            )
                .toISOString()
                .replace("T", " ")
                .replace("Z", "");
            // Insert new engineers
            await Promise.all(
                newEngineers.map(({ Engineer, EngineerName }) => {
                    const { firstname, lastname } = splitName(EngineerName);
                    return pool.query(insertQuery, [
                        firstname,
                        lastname,
                        Engineer,
                        currentDate,
                        currentDate,
                    ]);
                })
            );
        }
        res.status(201).json({
            message: `${newEngineers.length} new engineers added.`,
            skipped: names.length - newEngineers.length,
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export default addEngineers;
