CREATE TYPE departments as ENUM('HHP', 'DTV', 'HA', 'Claims', 'Service tracking');

create type login_method_enum as ENUM('password', 'oauth', 'sso');

create type login_status_enum as ENUM('success', 'failure');

CREATE TABLE company_people (
    user_id BIGSERIAL PRIMARY KEY,
    user_unique_id uuid DEFAULT gen_random_uuid(),
    full_name text,
    user_name text,
    email text,
    user_password text,
    department text,
    created_at date,
    updated_at date,
    user_role text,
    date_added text,
    reset_token VARCHAR(255),
    reset_token_expires_at TIMESTAMP
);

CREATE TABLE login_history (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    user_id BIGSERIAL NOT NULL,
    login_timestamp TIMESTAMP,
    logout_timestamp TIMESTAMP,
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
    department text,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

create table stores (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    store_name text,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

    create table technician_tasks (
        id BIGSERIAL PRIMARY KEY UNIQUE,
        unique_id uuid DEFAULT gen_random_uuid(),
        service_order_no text unique,
        date_booked date,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
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

-- Add a trigger for updated_at
-- CREATE OR REPLACE FUNCTION update_updated_at()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.updated_at = NOW();
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;
-- CREATE TRIGGER update_tasks_updated_at
-- BEFORE UPDATE ON tasks
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_updated_at();
create table technician_tasks_history (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text unique,
    date_booked date,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
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
    parts_pending_date text,
    parts_issued_date text,
    parts_pending boolean,
    stores text,
    parts_ordered_date text,
    repairshopr_job_id text,
    qc_complete boolean,
    qc_date text,
    parts_issued boolean,
    repeat_repair boolean
);

create table claims (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT NOW(),
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
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

create table booking_agents_tasks (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    ticket_number text,
    created_by text,
    booking_agent text,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
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
    emergency_brake FAIL_PASS_ENUM,
    steering_wheel FAIL_PASS_ENUM,
    windshield FAIL_PASS_ENUM,
    rear_window FAIL_PASS_ENUM,
    windshield_wipers FAIL_PASS_ENUM,
    headlights FAIL_PASS_ENUM,
    tail_lights FAIL_PASS_ENUM,
    turn_indicator_lights FAIL_PASS_ENUM,
    stop_lights FAIL_PASS_ENUM,
    front_seat_adjustment FAIL_PASS_ENUM,
    doors FAIL_PASS_ENUM,
    horn FAIL_PASS_ENUM,
    speedometer FAIL_PASS_ENUM,
    bumpers FAIL_PASS_ENUM,
    muffler_exhaust_system FAIL_PASS_ENUM,
    tires FAIL_PASS_ENUM,
    interior_exterior_view_mirros FAIL_PASS_ENUM,
    safety_belts FAIL_PASS_ENUM,
    engine_start_stop FAIL_PASS_ENUM,
    final_comment text,
    next_service_date date,
    cost_of_service bigserial,
    created_by text,
    updated_by text,
    mileage bigserial,
    license_plate varchar(10),
    vehicle_make text,
    vehicle_model text,
    vehicle_year varchar(4),
    vehicle_color text,
    vehicle_type text,
    triangle FAIL_PASS_ENUM,
    car_jack FAIL_PASS_ENUM,
    spare_wheel FAIL_PASS_ENUM,
    hass FAIL_PASS_ENUM,
    tools FAIL_PASS_ENUM,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
