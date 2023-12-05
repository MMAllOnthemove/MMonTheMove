const pool = require("./../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Update job by id

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      engineerAnalysis,
      inHouseStatus,
      ticket,
      reassignEngineer,
      isQCchecked,
      QCcomments,
      partsArr,
      user,
      GSPNStatusGetLastElement,
      dateModified,
      warranty,
    } = req.body;
    const editQuery = await pool.query(
      "UPDATE units SET engineer_analysis = $1, in_house_status = $2, ticket = $3, reassign_engineer = $4, is_qc_checked = $5, qc_comment = $6, parts_list = $7, modified_by_who = $8, gspn_status = $9, date_modified = $10, warranty = $11 WHERE id = $12 returning *",
      [
        engineerAnalysis,
        inHouseStatus,
        ticket,
        reassignEngineer,
        isQCchecked,
        QCcomments,
        partsArr,
        user,
        GSPNStatusGetLastElement,
        dateModified,
        warranty,
        id,
      ]
    );
    res.status(201).send(editQuery.rows);
  } catch (error) {
    // console.log("editQuery", error);
  }
};

// Update only one job gspn status
const updateJobclaimsGSPNStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { claimsGSPNStatus, userData, dateOfClaim } = req.body;
    const editQuery = await pool.query(
      "UPDATE units SET gspn_status = $1, claim_by = $2, claim_date = $3 WHERE id = $4 returning *",
      [claimsGSPNStatus, userData, dateOfClaim, id]
    );
    // res.status(201).send(editQuery.rows);
    console.log("editQuery", editQuery.rows);
  } catch (error) {
    console.log("update claims", error);
  }
};

module.exports = {
  updateJob,
  updateJobclaimsGSPNStatus,
};
