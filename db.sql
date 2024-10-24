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

CREATE TABLE login_history  (
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

create table hhp_jobs (
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
create table hhp_jobs_history (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    date_booked date,
    created_at date,
    updated_at date,
    model text,
    warranty text,
    engineer text,
    fault text,
    imei text,
    serial_number text,
    repairshopr_status text,
    gspn_status text,
    ticket_number text,
    department text,
    job_added_by text,
    updated_by text,
    reassign_engineer text,
    parts_list text [],
    stores text,
    parts_ordered_date date,
    repairshopr_job_id text,
    qc_complete boolean,
    qc_date date
);

create table hhp_claims (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    created_at date,
    created_by date,
    service_order_no text,
    claim_status text,
    department text,
    FOREIGN KEY (service_order_no) REFERENCES hhp_jobs(service_order_no)
);