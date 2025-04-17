"use strict"; // todo: remove
import "dotenv/config";
import * as Yup from "yup";
import { datetimestamp } from "../../../../utils/datetimestamp.js";

const verifyCreateTicketData = Yup.object({
    first_name: Yup.string().required("Please enter the first name"),
    last_name: Yup.string().required("Please enter the last name"),
    businessname: Yup.string(),
    email: Yup.string(),
    phone_number: Yup.string().required("Please enter the mobile number"),
    home_number: Yup.string(),
    address: Yup.string().required("Please enter the address"),
    address_2: Yup.string(),
    city: Yup.string().required("Please enter the city"),
    state: Yup.string().required("Please enter the state/province e.g. GP"),
    service_order_no: Yup.string().required("Please enter the service order"),
    model: Yup.string().required("Please enter the model"),
    warranty: Yup.string().required("Please select a warranty option"),
    // fault: Yup.string().required("Please describe the fault"),
    fault: Yup.string()
        .required("Please describe the fault")
        .test("not-only-asterisks", "Please select the fault", (value) => {
            if (!value) return false;
            // Remove all asterisks and whitespace, then check if anything meaningful remains
            return value.replace(/\*/g, "").trim().length > 0;
        }),
    imei: Yup.string().required("IMEI number is required"),
    serial_number: Yup.string().required("Serial number is required"),

    unit_status: Yup.string(), // always 'new'
    department: Yup.string(), // always 'HHP'

    job_added_by: Yup.string().required("You're not logged in"),
    issue_type: Yup.string().required(
        "Please select the service or issue type"
    ),
    accessories_and_condition: Yup.string().required(
        "Please list the item condition and any accessories"
    ),

    additional_info: Yup.string(),
    job_repair_no: Yup.string().required("Please enter the job repair no"),
    date_booked: Yup.string(),

    requires_backup: Yup.string().required(
        "Please indicate if backup is needed"
    ),
});

const returnDataWithNewRow =
    "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC";

const updateCustomerQuery = `
 update customers set
 repairshopr_customer_id = $1
 where id = $2
 `;
const insertQuery = `
        insert into technician_tasks 
        (
        service_order_no,
        model,
        warranty,
        imei,
        serial_number,
        unit_status,
        department,
        job_added_by,
        stores,
        accessories_and_condition,
        additional_info,
        job_repair_no,
        requires_backup,
        repairshopr_customer_id,
        fault,
        repeat_repair,
        ticket_type_id,
        created_by, 
        created_at, 
        date_booked)
        values
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) returning id
        
`;
const updateQuery = `
    update technician_tasks set 
    repairshopr_job_id = $1, 
    ticket_number = $2,
    rs_warranty = $3,
    repairshopr_asset_id = $4,
    repairshopr_customer_id = $5
    where id = $6
`;
const deleteQuery = `DELETE FROM technician_tasks WHERE id = $1`;
const insertCommentQuery = `INSERT INTO technician_tasks_comments (task_id, comment, created_at, created_by) VALUES ($1, $2, $3, $4) returning *`;
const bookingAgentTaskInsertQuery =
    "INSERT INTO booking_agents_tasks (ticket_number, created_by, booking_agent, created_at, original_ticket_date) VALUES ($1, $2, $3, $4, $5) returning *";

const createTicketFromSO = async (req, res) => {
    const {
        first_name, //
        last_name, //
        businessname, //
        email, //
        phone_number, //
        home_number, //
        address, //
        address_2, //
        state, //
        city, //
        zip, //
        service_order_no, //
        model, //
        warranty, //
        imei, //
        serial_number, //
        unit_status, //
        department, //
        job_added_by, //
        stores, //
        accessories_and_condition, //
        additional_info, //
        job_repair_no, //
        requires_backup, //
        fault, //
        repeat_repair, //
        ticket_type_id, //
        adh, //
        password, //
        assetId, //
        repairshopr_customer_id, //
        created_by, //
        warrantyCode, //
        issue_type, //
        repairshopr_id, //
    } = req.body;
    const created_at = datetimestamp;
    try {
        await verifyCreateTicketData.validate(req.body, {
            abortEarly: false,
        });
        // 1. Search for existing customer
        const customers = await searchCustomerOnRepairshopr(phone_number);
        let customer_id;
        let insertCustomerQuery;
        let values;

        if (customers.length > 0) {
            customer_id = customers[0].id;

            if (email && email.trim() !== "") {
                // Include email
                insertCustomerQuery = `
            INSERT INTO customers (
            first_name, last_name, business_name, email, phone_number, home_number,
            address, address_2, city, state, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
            `;
                values = [
                    capitalizeText(first_name),
                    capitalizeText(last_name),
                    businessname,
                    email.trim(),
                    phone_number,
                    home_number,
                    address,
                    address_2,
                    city,
                    state,
                    created_at,
                ];
            } else {
                // Omit email
                insertCustomerQuery = `
                INSERT INTO customers (
                first_name, last_name, business_name, phone_number, home_number,
                address, address_2, city, state, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id
                `;
                values = [
                    capitalizeText(first_name),
                    capitalizeText(last_name),
                    businessname,
                    phone_number,
                    home_number,
                    address,
                    address_2,
                    city,
                    state,
                    created_at,
                ];
            }
            const { rows } = await pool.query(insertCustomerQuery, values);
            if (rows?.length > 0) {
                const localCustomerId = rows[0].id;

                await pool.query(updateCustomerQuery, [
                    customer_id,
                    localCustomerId,
                ]);
            }
        } else {
            // 2. Create Customer on RepairShopr
            const res_customer = await createCustomerOnRepairshopr(
                first_name,
                last_name,
                businessname,
                email,
                phone_number,
                home_number,
                address,
                address_2,
                city,
                state
            );

            customer_id = res_customer?.data?.customer?.id;

            if (res_customer?.status === 200) {
                try {
                    if (email && email.trim() !== "") {
                        // Include email
                        insertCustomerQuery = `
            INSERT INTO customers (
            first_name, last_name, business_name, email, phone_number, home_number,
            address, address_2, city, state, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
            `;
                        values = [
                            capitalizeText(first_name),
                            capitalizeText(last_name),
                            businessname,
                            email.trim(),
                            phone_number,
                            home_number,
                            address,
                            address_2,
                            city,
                            state,
                            created_at,
                        ];
                    } else {
                        // Omit email
                        insertCustomerQuery = `
                INSERT INTO customers (
                first_name, last_name, business_name, phone_number, home_number,
                address, address_2, city, state, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id
                `;
                        values = [
                            capitalizeText(first_name),
                            capitalizeText(last_name),
                            businessname,
                            phone_number,
                            home_number,
                            address,
                            address_2,
                            city,
                            state,
                            created_at,
                        ];
                    }
                    // Insert customer locally
                    const { rows } = await pool.query(
                        insertCustomerQuery,
                        values
                    );

                    if (rows?.length > 0) {
                        // Update customer with RS ID
                        await pool.query(updateCustomerQuery, [
                            customer_id,
                            rows[0].id,
                        ]);
                    }
                } catch (e) {
                    console.log(
                        "Error inserting/updating customer locally:",
                        e
                    );
                }
            }
        }

        // 3. Search for asset
        const assets = await searchAssetOnRepairshopr(
            serial_number,
            customer_id
        );
        let asset_ids = assets.length ? assets.map((a) => a.id) : [];

        // 4. Create asset if none
        if (asset_ids.length === 0) {
            const assetPayload = {
                asset_type_name: "HHP",
                properties: { "IMEI No.": imei, "Model No.:": model },
                name: model,
                customer_id: customer_id,
                asset_serial: serial_number,
            };
            const createdAsset = await createAssetOnRepairshopr(assetPayload);
            asset_ids = createdAsset;
        }

        // insert data locally first
        const { rows } = await pool.query(insertQuery, [
            service_order_no,
            model,
            warranty,
            imei,
            serial_number,
            "New", // unit_status
            "HHP", // department
            job_added_by,
            stores,
            accessories_and_condition,
            additional_info,
            job_repair_no,
            requires_backup,
            customer_id,
            fault,
            repeat_repair,
            ticket_type_id,
            created_by,
            created_at,
            created_at,
        ]);

        const insertedId = rows[0]?.id;
        // 5. Create ticket
        const rs_response = await createTicketOnRepairshopr(
            customer_id,
            issue_type,
            fault,
            ticket_type_id,
            repairshopr_id,
            service_order_no,
            accessories_and_condition,
            requires_backup,
            adh,
            imei,
            job_repair_no,
            additional_info,
            password,
            asset_ids,
            created_by,
            warrantyCode
        );
        if (rs_response?.status === 200) {
            const updateRow = await pool.query(updateQuery, [
                rs_response?.data?.ticket?.id,
                rs_response?.data?.ticket?.number,
                warrantyCode,
                rs_response?.data?.ticket?.asset_ids[0], // when booking from so, we will also need to update the rs asset id since we don't initially have it
                rs_response?.data?.ticket?.customer_id, // when booking from so, we will also need to update the rs customer id since we don't initially have it
                insertedId,
            ]);

            // insert an intial comment locally, that has the person who booked, the time and date, and the fault is the body (rs is handled)
            await pool.query(insertCommentQuery, [
                insertedId,
                fault,
                created_at,
                job_added_by,
            ]);
            // then lastly, add it to the booking agents' table for data reporting
            await pool.query(bookingAgentTaskInsertQuery, [
                rs_response?.data?.ticket?.number,
                job_added_by,
                created_by,
                created_at,
                created_at,
            ]);

            const fetchResult = await pool.query(returnDataWithNewRow, [
                insertedId,
            ]);
            return res.status(201).json({
                message: `Ticket created ${rs_response?.data?.ticket?.number}`,
                task: fetchResult.rows[0],
            });
        } else {
            // Something went wrong even if it didn't throw — delete entry
            await pool.query(deleteQuery, [insertedId]);
            return res
                .status(500)
                .json({ message: "Failed to create ticket in RepairShopr" });
        }
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
export default createTicketFromSO;
