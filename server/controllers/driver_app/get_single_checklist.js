import { pool } from "../../db.js";

const getChecklist = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "SELECT vc.*, vc.created_at, COALESCE(NULLIF(vc.next_service_date, ''), '2000-01-01')::date::text AS formatted_next_service_date, array_agg(vci.image_url) AS image_urls FROM vehicle_checklist vc LEFT JOIN vehicle_checklist_images vci ON vc.id = vci.vehicle_checklist_id WHERE vc.id = $1 GROUP BY vc.id",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Checklist not found" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Could not fetch checklist" });
    }
};

export default getChecklist;
