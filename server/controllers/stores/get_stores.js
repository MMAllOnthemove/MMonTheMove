import { pool } from "../../db.js";

const getStores = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * from stores order by created_at desc"
        );

        res.json(rows);
    } catch (error) {
        console.log("get stores error", error);
        res.status(500).json({ error: error.message });
    }
};

export default getStores;
