import { pool } from "../../../../db.js";

const CreateChecklist = async (req, res) => {
  const {
    id,
    selectCar,
    driver,
    odometer,
    furtherComments,
    userData,
    carJasckIsEnabled,
    spareWheelCheckIsEnabled,
    triagleCheckIsEnabled,
    oilCheckIsEnabled,
    waterCheckIsEnabled,
    tirePressureCheckIsEnabled,
    dateAddedFormatted,
  } = req.body;
  try {
    // If checklist for today for particular car has been done, cannot repeat same car for same day
    const findIfExists = await pool.query(
      "SELECT car, date_added from cars_checklist where car = $1 AND date_added = $2",
      [selectCar, dateAddedFormatted]
    );
    if (findIfExists.rowCount > 0) {
      res
        .status(400)
        .json("Checklist for this car has already been done today");
    } else {
      const { rows } = await pool
        // table is using the original jobs foreign key, hence 'job_id'
        .query(
          `INSERT INTO cars_checklist (job_id, car, car_odometer, car_driver, car_jack_check, car_spare_wheel_check, car_triangle_check, car_oil_check, car_water_check, car_tire_pressure_check, further_comments, checklist_created_by,date_added) VALUES ($1,$2,$3,$4,$5, $6,$7,$8,$9,$10,$11,$12, $13)`,
          [
            id,
            selectCar,
            odometer,
            driver,
            carJasckIsEnabled,
            spareWheelCheckIsEnabled,
            triagleCheckIsEnabled,
            oilCheckIsEnabled,
            waterCheckIsEnabled,
            tirePressureCheckIsEnabled,
            furtherComments,
            userData,
            dateAddedFormatted,
          ]
        );
      res.status(201).json({ created: true });
    }
  } catch (e) {}
};

export default CreateChecklist;
