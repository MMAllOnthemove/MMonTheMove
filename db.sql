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
    qc_checked boolean,
    qc_comment text,
    is_qc_checked boolean,
    parts_list text [],
    gspn_status text
);

ALTER TABLE
    units
ALTER COLUMN
    date_modified TYPE text;

ALTER TABLE
    units_history
ALTER COLUMN
    date_modified TYPE text;

ALTER TABLE
    units_history DROP COLUMN qc_checked;

ALTER TABLE
    units_history
ALTER COLUMN
    service_order_no TYPE text;

ALTER TABLE
    units
ALTER COLUMN
    service_order_no TYPE text;

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
    qc_checked boolean,
    qc_comment text,
    is_qc_checked boolean,
    parts_list text [],
    gspn_status text
);