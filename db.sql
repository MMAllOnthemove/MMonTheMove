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

-- On edit page
-- - date_modified
-- - modified_by 
-- -