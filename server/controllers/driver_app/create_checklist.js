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
    reason_for_use: Yup.string()
        .oneOf(Object.values(reasonForUseEnum))
        .required(),
    created_at: Yup.string(),
    created_by: Yup.string(),
    driver: Yup.string().required(),
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
    turn_indicator_lights: Yup.string(),
    stop_lights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    stop_lights_fail_reason: Yup.string(),
    doors: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    doors_fail_reason: Yup.string(),
    doors: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    doors_fail_reason: Yup.string(),
    tail_lights: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    tail_lights_fail_reason: Yup.string(),
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
    triangle: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    triangle_fail_reason: Yup.string(),
    car_jack: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    car_jack_fail_reason: Yup.string(),
    spare_wheel: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    spare_wheel_fail_reason: Yup.string(),
    hass: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    hass_fail_reason: Yup.string(),
    tools: Yup.string().oneOf(Object.values(failPassEnum)).required(),
    tools_fail_reason: Yup.string(),
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
    } = req.body;

    try {
        const insertVehicleChecklistQuery = `
  INSERT INTO vehicle_checklist (
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
    tools_fail_reason
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24,
    $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47,
    $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63
  )
`;

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
        ];

        const findIfExists = await pool.query(
            "SELECT 1 FROM vehicle_checklist WHERE car = $1 AND DATE(created_at) = CURRENT_DATE",
            [car]
        );

        if (findIfExists.rows.length > 0) {
            return res.status(401).json({
                message: "Checklist already exists",
            });
        }
        const { rows } = await pool.query(insertVehicleChecklistQuery, values);
        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        error?.inner?.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default createChecklist;
