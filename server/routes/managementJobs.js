const express = require("express");
const router = express.Router();
const pool = require("../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Get repair information
// It's at the top because we get an error when it is at the bottom
router.get("/repair", async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/repair");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT id, unique_id, service_order_no, to_char(to_timestamp(created_date, 'YYYYMMDD'),'YYYY-MM-DD') AS created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, to_char(to_timestamp(engineer_assign_date, 'YYYYMMDD'),'YYYY-MM-DD') AS engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, date_modified FROM units ORDER BY date_modified DESC"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/repair", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }
    // res.send({
    //   fromCache: isCached,
    //   data: newResults.rows,
    // });
    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
});

// Post repair information

router.post("/repair", async (req, res) => {
  const {
    repairServiceOrder,
    repairCreatedDate,
    repairCreatedTime,
    repairModel,
    repairWarranty,
    repairEngineer,
    repairFault,
    repairImei,
    repairSerialNumber,
    repairInHouseStatus,
    repairEngineerAssignDate,
    repairEngineerAssignTime,
    repairEngineerAnalysis,
    repairTicket,
    repairDepartment,
    user,
  } = req.body;
  try {
    const results = await pool
      .query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
        [
          repairServiceOrder,
          repairCreatedDate,
          repairCreatedTime,
          repairModel,
          repairWarranty,
          repairEngineer,
          repairFault,
          repairImei,
          repairSerialNumber,
          repairInHouseStatus,
          repairEngineerAssignDate,
          repairEngineerAssignTime,
          repairEngineerAnalysis,
          repairTicket,
          repairDepartment,
          user,
        ]
      )
      .catch((e) => console.log("post error", e));

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// GET all table info from database
router.get("/", async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT id, unique_id, service_order_no, to_char(to_timestamp(created_date, 'YYYYMMDD'),'YYYY-MM-DD') AS created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, to_char(to_timestamp(engineer_assign_date, 'YYYYMMDD'),'YYYY-MM-DD') AS engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, date_modified FROM units ORDER BY date_modified DESC"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }
    // res.send({
    //   fromCache: isCached,
    //   data: newResults.rows,
    // });
    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
});

// GET one row table info from database

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM units WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (err) {
    // console.log(err);
  }
});

// POST all table info to database
router.post("/", async (req, res) => {
  const {
    service_order,
    createdDate,
    createdTime,
    model,
    warranty,
    engineer,
    fault,
    imei,
    serial_number,
    inHouseStatus,
    engineerAssignDate,
    engineerAssignTime,
    engineerAnalysis,
    ticket,
    department,
    user,
  } = req.body;
  try {
    const results = await pool
      .query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
        [
          service_order,
          createdDate,
          createdTime,
          model,
          warranty,
          engineer,
          fault,
          imei,
          serial_number,
          inHouseStatus,
          engineerAssignDate,
          engineerAssignTime,
          engineerAnalysis,
          ticket,
          department,
          user,
        ]
      )
      .catch((e) => console.log("post error", e));
    res.status(400).send("Bad Request");

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    // console.log(err);
  }
});

// Update single row on database
// Using COALESCE to prevent null values when updating
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      engineerAnalysis,
      inHouseStatus,
      partsPendingDate,
      partsOrderedDate,
      partsIssuedDate,
      qcCompletedDate,
      repairCompletedDate,
      ticket,
      reassignEngineer,
      isQCchecked,
      QCcomments,
      partsArr,
      user,
    } = req.body;
    const editQuery = await pool.query(
      "UPDATE units SET engineer_analysis = $1, in_house_status = $2, parts_pending_date = $3, parts_ordered_date = $4, parts_issued_date = $5, qc_completed_date = $6, repair_completed_date = $7, ticket = $8, reassignengineer = $9, isqcchecked = $10, qc_comment = $11, partslist = $12, modified_by_who = $13 WHERE id = $14 returning *",
      [
        engineerAnalysis,
        inHouseStatus,
        partsPendingDate,
        partsOrderedDate,
        partsIssuedDate,
        qcCompletedDate,
        repairCompletedDate,
        ticket,
        reassignEngineer,
        isQCchecked,
        QCcomments,
        partsArr,
        user,
        id,
      ]
    );
    if (res.status === 200 || res.status === 201) {
      res.send("Updated successfully");
      res.send(editQuery.rows);
    } else if (res.status === 404 || res.status === 405) {
      res.send("Failed to update");
    }
    // console.log(editQuery.rows);
  } catch (error) {
    // console.log(error);
  }
});

// Delete single row on database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query("DELETE FROM units WHERE id = $1", [
      id,
    ]);
    if (res.status === 200 || res.status === 201) {
      res.send("Deleted successfully");
      res.send(deleteQuery.rows[0]);
    } else if (res.status === 404 || res.status === 405) {
      res.send("Failed to delete");
    }
  } catch (error) {
    // console.log(error);
  }
});

module.exports = router;
