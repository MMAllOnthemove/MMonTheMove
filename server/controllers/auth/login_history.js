import "dotenv/config";
import { pool } from "../../db.js";
import { datetimestamp } from "../../utils/datetimestamp.js";

const LoginHistory = async (userId, loginMethod, loginStatus) => {
    const datetime = datetimestamp;
    try {
        const result = await pool.query(
            "INSERT INTO login_history (user_id, login_timestamp, login_method, login_status) VALUES ($1, $2, $3, $4)",
            [userId, datetime, loginMethod, loginStatus]
        );
        console.log("added to history table");
    } catch (error) {
        console.log("Could not add user to history table", error);
    }
};

export default LoginHistory;
