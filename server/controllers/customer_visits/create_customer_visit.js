import { pool } from "../../db.js";
import * as Yup from "yup";

const addCustomerSchema = Yup.object({
    firstname: Yup.string().required("Firstname is required!"),
    lastname: Yup.string().required("Lastname is required!"),
    businessname: Yup.string(),
    email: Yup.string(),
    phone: Yup.string(),
    mobile: Yup.string(),
    address: Yup.string(),
    address_2: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    repairshopr_customer_id: Yup.string(),
    created_at: Yup.string(),
});

const addCustomer = async (req, res) => {
    const {
        firstname,
        lastname,
        businessname,
        email,
        phone,
        mobile,
        address,
        address_2,
        city,
        state,
        zip,
        repairshopr_customer_id,
        visit_date,
        created_at,
    } = req.body;
    const lowercaseEmail = email?.toLowerCase();
    try {
        await addCustomerSchema.validate(req.body, { abortEarly: false });

        // Check if customer exists
        const { rows: existingCustomer } = await pool.query(
            "SELECT * FROM customers WHERE email = $1",
            [lowercaseEmail]
        );
        let customerId;
        if (existingCustomer.length > 0) {
            customerId = existingCustomer[0].id;
        } else {
            const { rows } = await pool.query(
                "INSERT INTO customers (first_name, last_name, business_name, email, phone_number, home_number, address, address_2, city, state, zip, repairshopr_customer_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
                [
                    firstname,
                    lastname,
                    businessname,
                    lowercaseEmail,
                    phone,
                    mobile,
                    address,
                    address_2,
                    city,
                    state,
                    zip,
                    repairshopr_customer_id,
                    created_at,
                ]
            );
            customerId = rows[0].id;
        }
        // Insert visit
        await pool.query(
            "INSERT INTO customer_visits (customer_id, visit_date) VALUES ($1, $2)",
            [customerId, visit_date]
        );
        return res.status(201).json({
            message: "Successfully added",
        });
    } catch (error) {
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

export default addCustomer;
