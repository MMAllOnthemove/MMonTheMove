CREATE TYPE departments_enum as ENUM('HHP', 'DTV', 'HA', 'Claims', 'Service tracking');

create type login_method_enum as ENUM('password', 'oauth', 'sso');

create type login_status_enum as ENUM('success', 'failure');

CREATE TABLE company_people (
    user_id BIGSERIAL PRIMARY KEY,
    user_unique_id uuid DEFAULT gen_random_uuid(),
    full_name text,
    email text,
    user_password text,
    department text,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    user_role text,
    reset_token VARCHAR(255),
    reset_token_expires_at TIMESTAMPTZ
);

CREATE TABLE login_history (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    user_id BIGSERIAL NOT NULL,
    login_timestamp TIMESTAMPTZ,
    logout_timestamp TIMESTAMPTZ,
    login_method login_method_enum,
    login_status login_status_enum,
    FOREIGN KEY (user_id) REFERENCES company_people(user_id)
);

CREATE INDEX idx_login_timestamp ON login_history (login_timestamp);

create table engineers (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    engineer_firstname text,
    engineer_lastname text,
    department departments_enum,
    engineer_code varchar(30),
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Samuel', 'Mkhadawire', 'HA', '7186005180');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Olivier John', 'Munguakokwa', 'HHP', '7186005298');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Paulas', 'Gambu', 'HHP', '7186005890');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Andrea', 'Likomba', 'DTV', '7186005998');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Iven', 'Maluleke', 'HA', '7186006006');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Ntwanano Agreement', 'Nkwashu', 'HHP', '7186006393');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('William Thabo', 'Kgatle', 'HHP', '7186006404');
create table stores (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    store_name text,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

create table technician_tasks (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text unique,
    date_booked date,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    model text,
    warranty text,
    engineer text,
    fault text,
    imei text,
    serial_number text,
    unit_status text,
    ticket_number text unique,
    department text,
    job_added_by text,
    updated_by text,
    reassign_engineer text,
    parts_list text [],
    assessment_date text,
    parts_pending boolean,
    parts_pending_date text,
    parts_issued_date text,
    stores text,
    parts_ordered_date text,
    repairshopr_job_id text,
    qc_complete boolean,
    qc_date text,
    completed_date date,
    parts_issued boolean,
    repeat_repair text
);

-- Create a trigger function to update the 'updated_at' field
-- CREATE OR REPLACE FUNCTION update_updated_at()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Update the 'updated_at' field with the current timestamp
--     NEW.updated_at = NOW();
--     -- Return the updated row
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;
-- CREATE TRIGGER update_tasks_updated_at BEFORE
-- UPDATE
--     ON en FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
create table technician_tasks_history (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text unique,
    date_booked date,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    model text,
    warranty text,
    engineer text,
    fault text,
    imei text,
    serial_number text,
    unit_status text,
    ticket_number text unique,
    department text,
    job_added_by text,
    updated_by text,
    reassign_engineer text,
    parts_list text [],
    assessment_date text,
    parts_pending boolean,
    parts_pending_date text,
    parts_issued_date text,
    stores text,
    parts_ordered_date text,
    repairshopr_job_id text,
    qc_complete boolean,
    qc_date text,
    completed_date date,
    parts_issued boolean,
    repeat_repair text
);

create table claims (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ,
    created_by text,
    service_order_no text,
    ticket_number text unique,
    claim_status text,
    department text
);

create table booking_agents (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    agent_firstname text,
    agent_lastname text,
    department text,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

create table booking_agents_tasks (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    ticket_number text,
    created_by text,
    booking_agent text,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

create TYPE reason_for_use_enum as enum (
    'Fuel',
    'Callout (TV)',
    'Callout (Microwave)',
    'Callout (Fridge)',
    'Taking vehicle for service',
    'Microwave pickup',
    'Microwave delivery',
    'TV delivery',
    'TV pickup',
    'Fridge delivery',
    'Fridge pickup',
    'Driving to help another driver who is stuck',
    'Mobile devices delivery',
    'Mobile devices collection',
    'Other'
);

create type fail_pass_enum as enum ('Pass', 'Fail');

create table vehicle_checklist(
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    reason_for_use reason_for_use_enum,
    service_order_no text,
    ticket_number text,
    driver text,
    foot_brakes FAIL_PASS_ENUM,
    foot_brakes_fail_reason text,
    emergency_brake FAIL_PASS_ENUM,
    emergency_brake_fail_reason text,
    steering_wheel FAIL_PASS_ENUM,
    steering_wheel_fail_reason text,
    windshield FAIL_PASS_ENUM,
    windshield_fail_reason text,
    rear_window FAIL_PASS_ENUM,
    rear_window_fail_reason text,
    windshield_wipers FAIL_PASS_ENUM,
    windshield_wipers_fail_reason text,
    headlights FAIL_PASS_ENUM,
    headlights_fail_reason text,
    tail_lights FAIL_PASS_ENUM,
    tail_lights_fail_reason text,
    turn_indicator_lights FAIL_PASS_ENUM,
    turn_indicator_lights_fail_reason text,
    stop_lights FAIL_PASS_ENUM,
    stop_lights_fail_reason text,
    front_seat_adjustment FAIL_PASS_ENUM,
    front_seat_adjustment_fail_reason text,
    doors FAIL_PASS_ENUM,
    doors_fail_reason text,
    horn FAIL_PASS_ENUM,
    horn_fail_reason text,
    speedometer FAIL_PASS_ENUM,
    speedometer_fail_reason text,
    bumpers FAIL_PASS_ENUM,
    bumpers_fail_reason text,
    muffler_exhaust_system FAIL_PASS_ENUM,
    muffler_exhaust_system_fail_reason text,
    tires FAIL_PASS_ENUM,
    tires_fail_reason text,
    interior_exterior_view_mirros FAIL_PASS_ENUM,
    interior_exterior_view_mirros_fail_reason text,
    safety_belts FAIL_PASS_ENUM,
    safety_belts_fail_reason text,
    engine_start_stop FAIL_PASS_ENUM,
    engine_start_stop_fail_reason text,
    next_service_date TIMESTAMPTZ,
    cost_of_service bigserial,
    created_by text,
    updated_by text,
    mileage bigserial,
    license_plate text,
    car text,
    triangle FAIL_PASS_ENUM,
    triangle_fail_reason text,
    car_jack FAIL_PASS_ENUM,
    car_jack_fail_reason text,
    spare_wheel FAIL_PASS_ENUM,
    spare_wheel_fail_reason text,
    hass FAIL_PASS_ENUM,
    hass_fail_reason text,
    tools FAIL_PASS_ENUM,
    tools_fail_reason text,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

create table drivers (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    driver_firstname text,
    driver_lastname text,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

create table otp (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    created_by varchar(255),
    otp_code text,
    created_at TIMESTAMPTZ
);