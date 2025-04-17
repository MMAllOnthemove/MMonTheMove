import "dotenv/config";
import { pool } from "../../db.js";
import { datetimestamp } from "../../utils/datetimestamp.js";

const appLogs = async (operation, changed_by, changes, ticket) => {
    const datetime = datetimestamp;
   
    try {
        const result = await pool.query(
            "INSERT INTO logs (operation, changed_by, created_at, changes, ticket) values ($1, $2, $3, $4, $5)",
            [operation, changed_by, datetime, JSON.stringify(changes), ticket]
        );
    } catch (error) {
        console.log("insert logs error", error);
    }
};
export default appLogs;
