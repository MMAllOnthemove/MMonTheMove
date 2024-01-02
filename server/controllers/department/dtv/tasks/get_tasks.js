import { pool } from "../../../../db.js";

const GetActiveTasks = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT driver_jobs.id, job_unique_id, engineer, job_status::TEXT AS job_status, CONCAT(customer_first_name, ' ', customer_last_name) AS \"full_name\", CONCAT(customer_street_address, ' ', customer_street_address_two, ' ', customer_city, ' ', customer_province) AS \"customer_address\", customer_email, CONCAT(customer_homephone, ' - ', customer_mobilephone) AS \"customer_contact_info\", service_order_no, fault, ticket,ticket_number_id, parts_list, DATE(added_on)::TEXT AS added_on, added_by, cars_checklist.car_driver, cars_checklist.checklist_id, engineer_phone_number FROM driver_jobs LEFT JOIN CARS_CHECKLIST ON driver_jobs.id = CARS_CHECKLIST.checklist_id WHERE driver_jobs.job_status = true"
    );

    res.json(rows);
  } catch (e) {
    // console.log("newResults.rows", newResults.rows);
    console.log(e);
  }
};
const GetTasksForAnalytics = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT engineer, job_status::TEXT AS job_status, DATE(added_on)::TEXT AS added_on FROM driver_jobs"
    );
    res.json(rows);
  } catch (error) {
    // console.log(error);
  }
};

const GetTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT id, engineer, model, serial_number, service_order_no, created_date, warranty, warranty_repair_type, fault, imei, customer_email, customer_first_name, customer_last_name, customer_street_address, customer_street_address_two, customer_city, customer_country, customer_province, customer_district, customer_homephone, customer_mobilephone, ticket, parts_list, added_by, added_on, engineer_phone_number, job_status, ticket_number_id  from driver_jobs WHERE id = $1",
      [id]
    );
    res.json(rows);
  } catch (error) {
    // console.log(error);
  }
};

export { GetActiveTasks, GetTaskById, GetTasksForAnalytics };
