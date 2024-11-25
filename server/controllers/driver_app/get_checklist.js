import { pool } from "../../db.js";

const getChecklists = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT vc.*, TO_CHAR(vc.created_at, 'YYYY-MM-DD') AS formatted_created_at, COALESCE(NULLIF(vc.next_service_date, ''), '2000-01-01')::date::text AS formatted_next_service_date, array_agg(vci.image_url) AS image_urls FROM vehicle_checklist vc LEFT JOIN vehicle_checklist_images vci ON vc.id = vci.vehicle_checklist_id GROUP BY vc.id ORDER BY vc.created_at DESC"
        );

        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Could not fetch checklists" });
    }
};

export default getChecklists;
