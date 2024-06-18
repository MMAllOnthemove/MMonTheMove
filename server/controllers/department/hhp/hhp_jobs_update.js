import { pool } from "./../../../db.js";
import cron from "node-cron";
import "dotenv/config";
import axios from "axios";

// Update job by id

// const fetchGSPNJobData = async (service_order) => {
//   const options = {
//     IvSvcOrderNo: `${service_order}`,
//     IsCommonHeader: {
//       Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
//       AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
//       Lang: `${process.env.NEXT_PUBLIC_LANG}`,
//       Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
//       Pac: `${process.env.NEXT_PUBLIC_PAC}`,
//     },
//   };
//   try {
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL}`,
//       options,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
//         },
//       }
//     );
//     return data;
//     // console.log("gspn apidata", data);
//   } catch (error) {
//     console.log("backend gspn error", error);
//   }
// };
// const currentDate = new Date();
// const formattedDate = currentDate.toISOString().split("T")[0];

// const fetchFromOurSystem = async () => {
//   try {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`
//     );
//     return data;
//     // console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // every two hours
// cron.schedule("* */2 * * * *", async () => {
//   try {
//     const jobsFromOurSystem = await fetchFromOurSystem();
//     for (const job of jobsFromOurSystem) {
//       const gspnCheckStatusArr = await fetchGSPNJobData(job?.service_order_no);
//       const gspnMatchServiceOrder = await fetchGSPNJobData(
//         job?.service_order_no
//       );
//       if (
//         job?.service_order_no ===
//           gspnMatchServiceOrder?.Return?.EsHeaderInfo?.SvcOrderNo &&
//         job?.gspn_status !== "Goods Delivered"
//       ) {
//         await pool.query(
//           "UPDATE units SET gspn_status = $1, claim_by = $2, claim_date = $3 WHERE service_order_no = $4",
//           [
//             gspnCheckStatusArr?.EtLogInfo?.results[
//               gspnCheckStatusArr?.EtLogInfo?.results?.length - 1
//             ]?.StatusDesc,
//             gspnCheckStatusArr?.EtLogInfo?.results[
//               gspnCheckStatusArr?.EtLogInfo?.results?.length - 1
//             ]?.ChangedBy,
//             formattedDate,
//             job?.service_order_no,
//           ]
//         );
//       }
//     }
//   } catch (error) {
//     console.log("nowUseBothFunctions", error);
//   }
// });

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
  const { claimsGSPNStatus, user, dateOfClaim, id } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE units SET gspn_status = $1, claim_by = $2, claim_date = $3 WHERE id = $4 returning *",
      [claimsGSPNStatus, user, dateOfClaim, id]
    );
    res.status(201).send("Succesfully updated!");
  } catch (error) {
    res.status(500).json("Error editing");
  }
};

export { UpdateJob, UpdateJobclaimsGSPNStatus };
// export { UpdateJob, UpdateJobclaimsGSPNStatus };
