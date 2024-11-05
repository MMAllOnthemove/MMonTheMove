import { pool } from "../../../db.js";
import * as Yup from "yup";

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
            res.status(401).json({ message: "Task already exists" });
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
            res.status(201).json({
                message: "Successfully created",
            });
        }
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default CreateClaim;
