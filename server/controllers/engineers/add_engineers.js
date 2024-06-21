import { pool } from "../../db.js";
import * as Yup from "yup";

const addEngineersSchema = Yup.object({
  firstname: Yup.string().required("Firstname is required!"),
  lastname: Yup.string().required("Lastname is required!"),
  activeStatus: Yup.boolean().required("Active status is required!"),
});

const addEngineers = async (req, res) => {
  const { firstname, lastname, activeStatus } = req.body;
  try {
    await addEngineersSchema.validate(req.body);
    const { rows } = await pool.query(
      "INSERT INTO engineers (engineer_firstname, engineer_lastname, active) VALUES ($1, $2, $3)",
      [firstname, lastname, activeStatus]
    );

    res.status(201).json("Successfully created!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default addEngineers;
