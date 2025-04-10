CREATE TYPE departments_enum as ENUM('HHP', 'DTV', 'HA', 'Claims', 'Service tracking');

create type login_method_enum as ENUM('password', 'oauth', 'sso');

create type login_status_enum as ENUM('success', 'failure');

<<<<<<< HEAD
=======
create type user_role_enum as ENUM(
    'admin',
    'manager',
    'employee',
    'guest',
    'engineer',
    'booking_agent',
    'parts_department'
);

>>>>>>> origin/sockets-realtime
CREATE TABLE company_people (
    user_id BIGSERIAL PRIMARY KEY,
    user_unique_id uuid DEFAULT gen_random_uuid(),
    full_name text,
    email text,
    user_password text,
    department text,
    created_at text,
    updated_at text,
<<<<<<< HEAD
    user_role text,
=======
    user_role user_role_enum,
>>>>>>> origin/sockets-realtime
    reset_token VARCHAR(255),
    repairshopr_id INTEGER,
    permissions text,
    gspn_username varchar(30),
    reset_token_expires_at text
);

<<<<<<< HEAD
=======
create type auth_type_enum as ENUM('login', 'signup');

create table tokens (
    id BIGSERIAL PRIMARY KEY,
    token_unique_id uuid DEFAULT gen_random_uuid(),
    token text,
    user_id int unique,
    created_at text,
    auth_type auth_type_enum,
    FOREIGN KEY (user_id) REFERENCES company_people(user_id)
);

>>>>>>> origin/sockets-realtime
CREATE TABLE login_history (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    user_id BIGSERIAL NOT NULL,
    login_text text,
    logout_text text,
    login_method login_method_enum,
    login_status login_status_enum,
    FOREIGN KEY (user_id) REFERENCES company_people(user_id)
);

CREATE INDEX idx_login_text ON login_history (login_text);

create table engineers (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    engineer_firstname text,
    engineer_lastname text,
    department departments_enum,
    repairshopr_id INTEGER,
    engineer_code varchar(30),
    created_at text,
    updated_at text
);

-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Samuel', 'Mkhadawire', 'HA', '7186005180');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Olivier John', 'Munguakokwa', 'HHP', '7186005298');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Paulas', 'Gambu', 'HHP', '7186005890');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Andrea', 'Likomba', 'DTV', '7186005998');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Iven', 'Maluleke', 'HA', '7186006006');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('Ntwanano Agreement', 'Nkwashu', 'HHP', '7186006393');
-- INSERT INTO engineers (engineer_firstname, engineer_lastname, department, engineer_code) VALUES ('William Thabo', 'Kgatle', 'HHP', '7186006404');
---------------------------------------------------------------------
-- INSERT INTO stores (store_name, created_at, updated_at)
-- VALUES 
--     ('Springfield Mall', '2022-01-01 12:00:00+00', '2022-01-15 14:00:00+00'),
--     ('Downtown Grocery', '2022-02-20 10:00:00+00', '2022-03-01 16:00:00+00'),
--     ('Oceanview Supermarket', '2022-03-15 11:00:00+00', '2022-04-01 12:00:00+00'),
--     ('Main Street Convenience', '2022-04-10 09:00:00+00', '2022-05-01 10:00:00+00'),
--     ('Uptown Department Store', '2022-05-20 13:00:00+00', '2022-06-01 14:00:00+00'),
--     ('Beachside Pharmacy', '2022-06-15 10:00:00+00', '2022-07-01 11:00:00+00'),
--     ('City Center Bookstore', '2022-07-20 11:00:00+00', '2022-08-01 12:00:00+00'),
--     ('Suburban Hardware', '2022-08-15 09:00:00+00', '2022-09-01 10:00:00+00'),
--     ('Hilltop Bakery', '2022-09-20 12:00:00+00', '2022-10-01 13:00:00+00'),
-- 	    ('Carry In', '2022-09-20 12:00:00+00', '2022-10-01 13:00:00+00'),
--     ('Valley Florist', '2022-10-15 10:00:00+00', '2022-11-01 11:00:00+00');
create table stores (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    store_name text,
    created_at text,
    updated_at text
);

create table technician_tasks (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    date_booked text,
    created_at text,
    updated_at text,
    updated_by text,
    model text,
    warranty text,
    engineer text,
    fault text,
    imei text,
    serial_number text,
    unit_status text,
    ticket_number text,
    department text,
    job_added_by text,
<<<<<<< HEAD
    updated_by text,
=======
>>>>>>> origin/sockets-realtime
    reassign_engineer text,
    parts_list text [],
    assessment_date text,
    parts_pending boolean,
    parts_pending_date text,
    parts_issued_date text,
    stores text,
    parts_ordered_date text,
    in_progress_date text,
    assigned_date text,
    repairshopr_job_id text,
    qc_complete text,
    qc_date text,
<<<<<<< HEAD
=======
    qc_fail text,
    qc_fail_date text,
>>>>>>> origin/sockets-realtime
    unit_complete boolean,
    completed_date date,
    parts_issued boolean,
    repeat_repair text,
    units_assessed boolean,
    qc_comment text,
    parts_ordered boolean,
    parts_requested boolean,
    parts_requested_date text,
    collected boolean,
    collected_date text,
    compensation boolean,
    additional_info text,
    parts_order_id text,
    device_location text,
    job_repair_no text,
    repairshopr_customer_id numeric,
    accessories_and_condition text,
    requires_backup text,
    rs_warranty text,
    ticket_type_id text,
<<<<<<< HEAD
    fault_category text
);

=======
    quote_accepted boolean,
    quote_accepted_date text,
    quote_rejected boolean,
    quote_rejected_date text,
    fault_category text
);

create table hhp_quality_control (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    ticket_number text,
    qc_complete text,
    reason text,
    engineer text,
    created_at text,
    created_by text
);

>>>>>>> origin/sockets-realtime
create table technician_tasks_images (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    task_id bigint REFERENCES technician_tasks(id),
    image_url text,
    created_at text
);

create table technician_tasks_comments (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    task_id INTEGER REFERENCES technician_tasks(id),
    comment text,
    created_by text,
    created_at text
);

-- Create a trigger function to update the 'updated_at' field
-- CREATE OR REPLACE FUNCTION update_updated_at()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Update the 'updated_at' field with the current text
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
    created_at text,
    updated_at text,
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
    qc_complete text,
    qc_date text,
    completed_date date,
    parts_issued boolean,
    repeat_repair text,
    units_assessed boolean,
    qc_comment text,
    parts_ordered boolean
);

create table claims (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    created_at text,
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
    created_at text,
    updated_at text
);

create table booking_agents_tasks (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    ticket_number text,
    created_by text,
    booking_agent text,
    original_ticket_date text,
    created_at text,
    updated_at text
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
    'Other',
    'Regular check, no callout'
);

create type fail_pass_enum as enum ('Pass', 'Fail');

create table cars (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    plate_number text,
    car_model text,
    created_at text,
    updated_at text
);

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
    next_service_date text,
    cost_of_service bigserial,
    created_by text,
    updated_by text,
    mileage bigserial,
    mileage_after text,
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
    created_at text,
    updated_at text,
    license_disc_expiry text,
    next_service_kms text
);

create type tank_filled_enum as enum ('Yes', 'No');

create table vehicle_fuel_consumption (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    car_name text,
    -- plate number
    receipt_number text,
    odometer numeric,
    filled_volume_litres numeric,
    fuel_price_per_litre numeric,
    tank_filled tank_filled_enum,
    km_travelled_from_last_refill numeric,
    litres_travelled_from_last_refill numeric,
    total_fill_cost numeric,
    km_consumption_per_litre numeric,
    litres_consumption_per_100km numeric,
    miles_gallon numeric,
    cost_of_the_km numeric,
    created_at text
);

create table vehicle_checklist_images (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    vehicle_checklist_id bigint REFERENCES vehicle_checklist(id),
    image_url text,
    created_at text
);

-- Insert fake data into drivers table
-- INSERT INTO drivers (driver_firstname, driver_lastname, created_at, updated_at)
-- VALUES 
-- ('John', 'Doe', NOW() - INTERVAL '30 days', NOW() - INTERVAL '15 days'),
-- ('Jane', 'Smith', NOW() - INTERVAL '45 days', NOW() - INTERVAL '20 days'),
-- ('Robert', 'Brown', NOW() - INTERVAL '60 days', NOW() - INTERVAL '10 days'),
-- ('Alice', 'Johnson', NOW() - INTERVAL '75 days', NOW() - INTERVAL '5 days'),
-- ('Michael', 'Williams', NOW() - INTERVAL '90 days', NOW() - INTERVAL '25 days'),
-- ('Emma', 'Jones', NOW() - INTERVAL '10 days', NOW() - INTERVAL '3 days'),
-- ('Oliver', 'Garcia', NOW() - INTERVAL '120 days', NOW() - INTERVAL '50 days'),
-- ('Isabella', 'Martinez', NOW() - INTERVAL '15 days', NOW() - INTERVAL '7 days'),
-- ('Liam', 'Rodriguez', NOW() - INTERVAL '180 days', NOW() - INTERVAL '90 days'),
-- ('Sophia', 'Hernandez', NOW() - INTERVAL '200 days', NOW() - INTERVAL '100 days');
create table drivers (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    driver_firstname text,
    driver_lastname text,
    created_at text,
    updated_at text
);

create table otp (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    created_by varchar(255),
    otp_code text,
    created_at text
);

create table parts_for_tasks (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    task_row_id BIGSERIAL not null,
    ticket_number text,
    part_name text,
    part_desc text,
    seal_number text,
    part_quantity integer,
    parts_status text,
    created_at text,
    created_by text,
    updated_at text,
    compensation boolean,
    part_unused boolean,
    credit_req_number text,
    part_issued boolean,
<<<<<<< HEAD
=======
    part_returned boolean,
    is_old_part boolean,
>>>>>>> origin/sockets-realtime
    FOREIGN KEY (task_row_id) REFERENCES technician_tasks(id) ON DELETE CASCADE
);

CREATE TABLE devices (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    company text,
    marketing_name text null,
    device text,
    device_model text -- Add as many columns as your CSV file
);

create table customers (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    first_name text,
    last_name text,
    email text UNIQUE,
    phone_number text,
    home_number text,
    office_number text,
    repairshopr_customer_id numeric,
    address text,
    city text,
    state text,
    zip text,
    business_name text,
    address_2 text,
    created_at text,
    updated_at text
);

create table customer_visits (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    customer_id integer REFERENCES customers(id) ON DELETE CASCADE,
    visit_date text,
    visit_notes text
);

create table engineer_ra_status (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    -- did not want to link the main table for the purpose of the said feature to work properly
    engineer_code varchar(30),
    valid_from text,
    valid_to text
);

create table assembly_terms (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    term TEXT NOT NULL,
    bold boolean,
    created_at text
);

create table backup_terms (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    term TEXT NOT NULL,
    bold boolean,
    created_at text
);

create table dunorworks_reports (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    job_repair_no text,
    imei text,
    unit_status text,
    created_at text
);

create table reports_download (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    downloaded_by text,
    downloaded_at text
);

create table logs (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    operation text,
    changed_by text,
    created_at text,
    changes jsonb
<<<<<<< HEAD
)
=======
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    -- Unique identifier for the notification
    user_id uuid NOT NULL,
    -- User ID the notification is for
    type VARCHAR(255) NOT NULL,
    -- Type of the notification (e.g., 'task-assigned', 'task-updated')
    message TEXT NOT NULL,
    -- The actual notification message
    status VARCHAR(20) DEFAULT 'unread',
    -- Status of the notification ('read' or 'unread')
    created_at text,
    -- Timestamp for when the notification was created
    updated_at text,
    -- Timestamp for when the notification was last updated
    FOREIGN KEY (user_id) REFERENCES company_people(user_unique_id) -- Assuming there's a 'users' table
);

CREATE TABLE products (
    product_id bigserial,
    product__unique_id uuid NOT NULL unique,
    id BIGINT PRIMARY KEY,
    price_cost DECIMAL(10, 2) NOT NULL,
    price_retail DECIMAL(10, 2) NOT NULL,
    condition TEXT,
    description TEXT,
    maintain_stock BOOLEAN DEFAULT FALSE,
    name VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 0,
    warranty TEXT,
    sort_order INT,
    reorder_at INT,
    disabled BOOLEAN DEFAULT FALSE,
    taxable BOOLEAN DEFAULT TRUE,
    product_category VARCHAR(255),
    category_path VARCHAR(255),
    upc_code VARCHAR(255) UNIQUE,
    discount_percent DECIMAL(5, 2),
    warranty_template_id BIGINT,
    qb_item_id BIGINT,
    desired_stock_level INT,
    price_wholesale DECIMAL(10, 2) DEFAULT 0,
    notes TEXT,
    tax_rate_id BIGINT,
    physical_location VARCHAR(255),
    serialized BOOLEAN DEFAULT FALSE,
    vendor_ids JSONB,
    long_description TEXT,
    since_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    location_quantities JSONB,
    photos JSONB
);
>>>>>>> origin/sockets-realtime
