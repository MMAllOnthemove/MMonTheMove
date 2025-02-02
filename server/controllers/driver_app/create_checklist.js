import { pool } from "../../db.js";
import * as Yup from "yup";
import appLogs from "../logs/logs.js";

const reasonForUseEnum = [
    "Fuel",
    "Callout",
    "Taking vehicle for service",
    "Pickup",
    "Delivery",
    "Driving to help another driver who is stuck",
    "Other",
    "Regular check, no callout",
];

const failPassEnum = ["Pass", "Fail"];

const vehicleChecklistSchema = Yup.object().shape({
    created_at: Yup.string(),
    created_by: Yup.string(),
    car: Yup.string(),
    reason_for_use: Yup.string()
        .oneOf(Object.values(reasonForUseEnum))
        .required(),
    driver: Yup.string(),
    windshield: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    windshield_fail_reason: Yup.string(),
    windshield_wipers: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    windshield_wipers_fail_reason: Yup.string(),
    headlights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    headlights_fail_reason: Yup.string(),
    rear_window: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    rear_window_fail_reason: Yup.string(),
    tail_lights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    tail_lights_fail_reason: Yup.string(),
    turn_indicator_lights: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    turn_indicator_lights_fail_reason: Yup.string(),
    stop_lights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    stop_lights_fail_reason: Yup.string(),
    doors: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    doors_fail_reason: Yup.string(),
    tail_lights_fail_reason: Yup.string(),
    turn_indicator_lights_fail_reason: Yup.string(),
    stop_lights_fail_reason: Yup.string(),
    bumpers: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    bumpers_fail_reason: Yup.string(),
    muffler_exhaust_system: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    muffler_exhaust_system_fail_reason: Yup.string(),
    tires: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    tires_fail_reason: Yup.string(),
    foot_brakes: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    foot_brakes_fail_reason: Yup.string(),
    emergency_brake: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    emergency_brake_fail_reason: Yup.string(),
    steering_wheel: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    steering_wheel_fail_reason: Yup.string(),
    front_seat_adjustment: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    front_seat_adjustment_fail_reason: Yup.string(),
    horn: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    horn_fail_reason: Yup.string(),
    speedometer: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    speedometer_fail_reason: Yup.string(),
    interior_exterior_view_mirros: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    interior_exterior_view_mirros_fail_reason: Yup.string(),
    safety_belts: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    safety_belts_fail_reason: Yup.string(),
    engine_start_stop: Yup.string()
        .oneOf(Object.values(failPassEnum))
        .required(),
    engine_start_stop_fail_reason: Yup.string(),
    mileage: Yup.string(),
    triangle: Yup.string().oneOf(Object.values(failPassEnum)),
    triangle_fail_reason: Yup.string(),
    car_jack: Yup.string().oneOf(Object.values(failPassEnum)),
    car_jack_fail_reason: Yup.string(),
    spare_wheel: Yup.string().oneOf(Object.values(failPassEnum)),
    spare_wheel_fail_reason: Yup.string(),
    hass: Yup.string().oneOf(Object.values(failPassEnum)),
    hass_fail_reason: Yup.string(),
    tools: Yup.string().oneOf(Object.values(failPassEnum)),
    tools_fail_reason: Yup.string(),
    next_service_date: Yup.string(),
    next_service_kms: Yup.string(),
    license_disc_expiry: Yup.string(),
});

const createChecklist = async (req, res) => {
    const {
        created_at,
        created_by,
        car,
        reason_for_use,
        driver,
        windshield,
        windshield_fail_reason,
        windshield_wipers,
        windshield_wipers_fail_reason,
        headlights,
        headlights_fail_reason,
        rear_window,
        rear_window_fail_reason,
        tail_lights,
        turn_indicator_lights,
        stop_lights,
        doors,
        tail_lights_fail_reason,
        turn_indicator_lights_fail_reason,
        stop_lights_fail_reason,
        doors_fail_reason,
        bumpers,
        bumpers_fail_reason,
        muffler_exhaust_system,
        muffler_exhaust_system_fail_reason,
        tires,
        tires_fail_reason,
        foot_brakes,
        foot_brakes_fail_reason,
        emergency_brake,
        emergency_brake_fail_reason,
        steering_wheel,
        steering_wheel_fail_reason,
        front_seat_adjustment,
        front_seat_adjustment_fail_reason,
        horn,
        horn_fail_reason,
        speedometer,
        speedometer_fail_reason,
        interior_exterior_view_mirros,
        interior_exterior_view_mirros_fail_reason,
        safety_belts,
        safety_belts_fail_reason,
        engine_start_stop,
        engine_start_stop_fail_reason,
        mileage,
        triangle,
        triangle_fail_reason,
        car_jack,
        car_jack_fail_reason,
        spare_wheel,
        spare_wheel_fail_reason,
        hass,
        hass_fail_reason,
        tools,
        tools_fail_reason,
        next_service_date,
        next_service_kms,
        license_disc_expiry,
    } = req.body;
    try {
        // Validate request body
        await vehicleChecklistSchema.validate(req.body, { abortEarly: false });

        const findIfExists = await pool.query(
            "SELECT 1 FROM vehicle_checklist WHERE car = $1 AND DATE(created_at) = CURRENT_DATE",
            [car]
        );

        if (findIfExists.rows.length > 0) {
            return res.status(401).json({
                message: "Checklist already exists",
            });
        }
        const insertVehicleChecklistQuery = `INSERT INTO vehicle_checklist (
            created_at,
            created_by,
            car,
            reason_for_use,
            driver,
            windshield,
            windshield_fail_reason,
            windshield_wipers,
            windshield_wipers_fail_reason,
            headlights,
            headlights_fail_reason,
            rear_window,
            rear_window_fail_reason,
            tail_lights,
            turn_indicator_lights,
            stop_lights,
            doors,
            tail_lights_fail_reason,
            turn_indicator_lights_fail_reason,
            stop_lights_fail_reason,
            doors_fail_reason,
            bumpers,
            bumpers_fail_reason,
            muffler_exhaust_system,
            muffler_exhaust_system_fail_reason,
            tires,
            tires_fail_reason,
            foot_brakes,
            foot_brakes_fail_reason,
            emergency_brake,
            emergency_brake_fail_reason,
            steering_wheel,
            steering_wheel_fail_reason,
            front_seat_adjustment,
            front_seat_adjustment_fail_reason,
            horn,
            horn_fail_reason,
            speedometer,
            speedometer_fail_reason,
            interior_exterior_view_mirros,
            interior_exterior_view_mirros_fail_reason,
            safety_belts,
            safety_belts_fail_reason,
            engine_start_stop,
            engine_start_stop_fail_reason,
            mileage,
            triangle,
            triangle_fail_reason,
            car_jack,
            car_jack_fail_reason,
            spare_wheel,
            spare_wheel_fail_reason,
            hass,
            hass_fail_reason,
            tools,
            tools_fail_reason,
            next_service_date,
            next_service_kms,
            license_disc_expiry
            ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15, $16, $17, $18, $19, $20,$21, $22, $23, $24, $25, $26, $27, $28, $29, $30,$31, $32, $33, $34, $35, $36, $37, $38, $39, $40,$41, $42, $43, $44, $45, $46, $47, $48, $49, $50,$51, $52, $53, $54, $55, $56, $57, $58, $59) returning *`;

        const values = [
            created_at,
            created_by,
            car,
            reason_for_use,
            driver,
            windshield,
            windshield_fail_reason,
            windshield_wipers,
            windshield_wipers_fail_reason,
            headlights,
            headlights_fail_reason,
            rear_window,
            rear_window_fail_reason,
            tail_lights,
            turn_indicator_lights,
            stop_lights,
            doors,
            tail_lights_fail_reason,
            turn_indicator_lights_fail_reason,
            stop_lights_fail_reason,
            doors_fail_reason,
            bumpers,
            bumpers_fail_reason,
            muffler_exhaust_system,
            muffler_exhaust_system_fail_reason,
            tires,
            tires_fail_reason,
            foot_brakes,
            foot_brakes_fail_reason,
            emergency_brake,
            emergency_brake_fail_reason,
            steering_wheel,
            steering_wheel_fail_reason,
            front_seat_adjustment,
            front_seat_adjustment_fail_reason,
            horn,
            horn_fail_reason,
            speedometer,
            speedometer_fail_reason,
            interior_exterior_view_mirros,
            interior_exterior_view_mirros_fail_reason,
            safety_belts,
            safety_belts_fail_reason,
            engine_start_stop,
            engine_start_stop_fail_reason,
            mileage,
            triangle,
            triangle_fail_reason,
            car_jack,
            car_jack_fail_reason,
            spare_wheel,
            spare_wheel_fail_reason,
            hass,
            hass_fail_reason,
            tools,
            tools_fail_reason,
            next_service_date,
            next_service_kms,
            license_disc_expiry,
        ];
        const { rows } = await pool.query(insertVehicleChecklistQuery, values);
        await appLogs("INSERT", created_by, req.body);
        return res.status(201).json({
            message: "Successfully created",
            rows: rows,
        });
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        if (error.inner) {
            error?.inner?.forEach((err) => {
                errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
            });
            return res.status(500).json({ errors });
        }
        // Handle other errors
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default createChecklist;
