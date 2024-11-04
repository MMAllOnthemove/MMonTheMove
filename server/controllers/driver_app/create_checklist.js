import { pool } from "../../db.js";
import * as Yup from "yup";

const reasonForUseEnum = [
    "Fuel",
    "Callout (TV)",
    "Callout (Microwave)",
    "Callout (Fridge)",
    "Taking vehicle for service",
    "Microwave pickup",
    "Microwave delivery",
    "TV delivery",
    "TV pickup",
    "Fridge delivery",
    "Fridge pickup",
    "Driving to help another driver who is stuck",
    "Mobile devices delivery",
    "Mobile devices collection",
    "Other",
];

const failPassEnum = ["Pass", "Fail"];

const vehicleChecklistSchema = Yup.object().shape({
    reasonForUse: Yup.string()
        .oneOf(Object.values(reasonForUseEnum))
        .required(),
    driver: Yup.string().required(),
    footBrakes: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    emergencyBrake: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    steeringWheel: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    windshield: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    rearWindow: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    windshieldWipers: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    headlights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    tailLights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    turnIndicatorLights: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    stopLights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    frontSeatAdjustment: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    doors: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    horn: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    speedometer: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    bumpers: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    mufflerExhaustSystem: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    tires: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    interiorExteriorViewMirrors: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    safetyBelts: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    engineStartStop: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    finalComment: Yup.string().nullable(),
    nextServiceDate: Yup.date().nullable(),
    costOfService: Yup.number().integer().nullable(),
    createdBy: Yup.string().required(),
    mileage: Yup.number().integer().required(),
    licensePlate: Yup.string().required(),
    car: Yup.string().required(),
    triangle: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    carJack: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    spareWheel: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    hass: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    tools: Yup.string().oneOf(Object.values(failPassEnum)).required(),
});

const createChecklist = async (req, res) => {
    const payload = req.body;
    // Validate request body
    await vehicleChecklistSchema.validate(req.body, { abortEarly: false });
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    // Construct dynamic SQL query for patching only changed values using prepared statements
    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

    // The query with placeholders ($1, $2, ..., $n) for prepared statements
    const query = `INSERT INTO vehicle_checklist (${keys.join(
        ", "
    )}) VALUES (${keys
        .map((_, index) => `$${index + 1}`)
        .join(", ")}) RETURNING *`;

    try {
        // await addAgentsSchema.validate(req.body, { abortEarly: false });
        // Execute the prepared statement query
        const result = await pool.query({
            text: query,
            values: values,
        });
        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        console.log(error);
        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default createChecklist;
