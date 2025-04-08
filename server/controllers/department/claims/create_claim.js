import { pool } from "../../../db.js";
import * as Yup from "yup";
import appLogs from "../../logs/logs.js";

const claimSchema = Yup.object().shape({
    service_order_no: Yup.string()
        .min(10, "Service order is 10 digits!")
        .max(10, "Service order is 10 digits!")
        .required("Service Order is required!"),
    ticket_number: Yup.string().required("Ticket number is required!"),
    claim_status: Yup.string().required("What is the status?"),
    department: Yup.string().required("What is the department?"),
    created_at: Yup.string(),
    created_by: Yup.string()
        .email("Email is invalid!")
        .required("Your email is required!"),
});

const CreateClaim = async (req, res) => {
    const {
        service_order_no,
        ticket_number,
        claim_status,
        department,
        created_by,
        created_at,
    } = req.body;

    try {
        await claimSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT service_order_no from claims where service_order_no = $1",
            [service_order_no]
        );
        if (findIfExists.rows.length > 0) {
            return res.status(409).json({ message: "Task already exists" });
        } else {
            await pool.query(
                "INSERT INTO claims (service_order_no, ticket_number, claim_status, department, created_by, created_at) values ($1, $2, $3, $4, $5, $6) returning *",
                [
                    service_order_no,
                    ticket_number,
                    claim_status,
                    department,
                    created_by,
                    created_at,
                ]
            );
<<<<<<< HEAD
            await appLogs("INSERT", created_by, req.body);
=======
            await appLogs("INSERT", created_by, req.body, ticket_number);
>>>>>>> origin/sockets-realtime
            return res.status(201).json({
                message: "Successfully created",
            });
        }
    } catch (error) {
<<<<<<< HEAD
=======
        console.log(error);
>>>>>>> origin/sockets-realtime
        // Handle validation or other errors
        const errors = {};
        if (error.inner) {
            error.inner.forEach((err) => {
                errors[err.path] = err.message; // Collect field validation errors
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default CreateClaim;
