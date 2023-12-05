const pool = require("../../../../db");

const createTask = async (req, res) => {
  const {
    acknowledgeDate,
    acknowledgeTime,
    engineerAssignDate,
    engineerAssignTime,
    engineer,
    model,
    remark,
    serialNumber,
    serviceOrder,
    createdDate,
    createdTime,
    warranty,
    warrantyRepairType,
    fault,
    IMEI,
    customerEmail,
    customerFirstName,
    customerLastName,
    customerStreetAddress,
    customerStreetAddressTwo,
    customerCity,
    customerCountry,
    customerProvince,
    customerDistrict,
    customerHomePhone,
    customerMobilePhone,
    ticket,
    ticketNumberId,
    partsAssignedForJob,
    dateAdded,
    jobStatus,
    engineerPhoneNumber,
  } = req.body;

  try {
    const ifServiceOrderExists = await pool.query(
      "SELECT service_order_no from driver_jobs WHERE service_order_no = $1",
      [serviceOrder]
    );
    const ifIMEIExists = await pool.query(
      "SELECT imei from driver_jobs WHERE imei = $1",
      [IMEI]
    );
    const ifModelNumberExists = await pool.query(
      "SELECT model from driver_jobs WHERE model = $1",
      [model]
    );
    const ifSerialNumberExists = await pool.query(
      "SELECT serial_number from driver_jobs WHERE serial_number = $1",
      [serialNumber]
    );
    if (
      ifServiceOrderExists.rowCount > 0 ||
      ifIMEIExists.rowCount > 0 ||
      ifModelNumberExists.rowCount > 0 ||
      ifSerialNumberExists.rowCount > 0
    ) {
      res.status(400).json("Job exists");
      console.log("Job exists");
    } else {
      const postData = await pool.query(
        "INSERT INTO driver_jobs (acknowledge_date, acknowledge_time, engineer_assign_date, engineer_assign_time, engineer, model, remark, serial_number, service_order_no, created_date, created_time, warranty, warranty_repair_type, fault, imei, customer_email, customer_first_name, customer_last_name, customer_street_address, customer_street_address_two, customer_city, customer_country, customer_province, customer_district, customer_homephone, customer_mobilephone, ticket, ticket_number_id, parts_list, added_on, job_status, engineer_phone_number) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32) returning *",
        [
          acknowledgeDate,
          acknowledgeTime,
          engineerAssignDate,
          engineerAssignTime,
          engineer,
          model,
          remark,
          serialNumber,
          serviceOrder,
          createdDate,
          createdTime,
          warranty,
          warrantyRepairType,
          fault,
          IMEI,
          customerEmail,
          customerFirstName,
          customerLastName,
          customerStreetAddress,
          customerStreetAddressTwo,
          customerCity,
          customerCountry,
          customerProvince,
          customerDistrict,
          customerHomePhone,
          customerMobilePhone,
          ticket,
          ticketNumberId,
          partsAssignedForJob,
          dateAdded,
          jobStatus,
          engineerPhoneNumber,
        ]
      );
      res.status(201).json({ created: true });
    }
  } catch (e) {
    // console.log(dbQuery.rows[0]);
    console.log("Create task error: ", e);
  }
};
module.exports = { createTask };
