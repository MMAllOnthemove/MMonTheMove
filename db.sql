CREATE TABLE parts_department (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order text,
    warranty text,
    model text,
    imei text,
    fault text,
    serial_number text,
    engineer text,
    dispatch_analysis text,
    in_house_status text,
    ticket text,
    department text,
    dispatch_by text,
    added_by text,
    all_parts text [],
    parts_checked text,
    reason_for_incomplete_parts text,
    job_added_date text
);

CREATE TABLE parts_department_history (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order text,
    warranty text,
    model text,
    imei text,
    fault text,
    serial_number text,
    engineer text,
    dispatch_analysis text,
    in_house_status text,
    ticket text,
    department text,
    job_modified_date text,
    dispatch_by text,
    added_by text,
    all_parts text [],
    parts_checked text,
    reason_for_incomplete_parts text,
    job_added_date text
);

CREATE TABLE units (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    created_date text,
    created_time text,
    model text,
    warranty text,
    engineer text,
    fault text,
    imei text,
    serial_number text,
    in_house_status text,
    engineer_assign_date text,
    engineer_assign_time text,
    ticket text,
    engineer_analysis text,
    department text,
    date_added text,
    date_modified text,
    job_added_by text,
    modified_by_who text,
    reassign_engineer text,
    qc_comment text,
    is_qc_checked boolean,
    parts_list text [],
    gspn_status text,
    claim_by text,
    claim_date date
);

ALTER TABLE
    units DROP COLUMN parts_ordered_date,
    DROP COLUMN parts_pending_date,
    DROP COLUMN parts_issued_date,
    DROP COLUMN qc_completed_date,
    DROP COLUMN repair_completed_date,
    DROP COLUMN qccomments,
    DROP COLUMN qc_checked;

ALTER TABLE
    units
ALTER COLUMN
    date_modified TYPE text,
ALTER COLUMN
    service_order_no TYPE text,
    RENAME COLUMN partslist TO parts_list,
    RENAME COLUMN isqcchecked TO is_qc_checked,
    RENAME COLUMN reassignengineer TO reassign_engineer;

ALTER TABLE
    units
ADD
    COLUMN date_added text;

CREATE TABLE units_history (
    id BIGSERIAL PRIMARY KEY UNIQUE,
    unique_id uuid DEFAULT gen_random_uuid(),
    service_order_no text,
    created_date text,
    created_time text,
    model text,
    warranty text,
    engineer text,
    fault text,
    imei text,
    serial_number text,
    in_house_status text,
    engineer_assign_date text,
    engineer_assign_time text,
    ticket text,
    engineer_analysis text,
    department text,
    date_added text,
    date_modified text,
    job_added_by text,
    modified_by_who text,
    reassign_engineer text,
    qc_comment text,
    is_qc_checked boolean,
    parts_list text [],
    gspn_status text
);

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
    is_user_blocked boolean,
    date_added text
);

CREATE TABLE otp (
    ip_address text,
    created_at timestamp,
    otp text
)
