import { pool } from "./../../../db.js";

// Update job by id

const UpdateJob = async (req, res) => {
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
  } catch (error) {}
};

// Update only one job gspn status
const UpdateJobclaimsGSPNStatus = async (req, res) => {
  const { id } = req.params;
  const { claimsGSPNStatus, userData, dateOfClaim } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE units SET gspn_status = $1, claim_by = $2, claim_date = $3 WHERE id = $4 returning *",
      [claimsGSPNStatus, userData, dateOfClaim, id]
    );
    res.status(201).send({ message: "Updated!" });
  } catch (error) {}
};

export { UpdateJob, UpdateJobclaimsGSPNStatus };
