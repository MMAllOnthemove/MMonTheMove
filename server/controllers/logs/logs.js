import "dotenv/config";
import * as Yup from "yup";
import { pool } from "../../db.js";
import { datetimestamp } from "../../utils/datetimestamp.js";

const appLogs = async (operation, changed_by, changes) => {
    const datetime = datetimestamp;

    try {
        const result = await pool.query(
            "INSERT INTO logs (operation, changed_by, created_at, changes) values ($1, $2, $3, $4)",
            [operation, changed_by, datetime, JSON.stringify(changes)]
        );
    } catch (error) {
        //
    }
};
export default appLogs;
