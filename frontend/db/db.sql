













   date_created date default current_date
   id BIGSERIAL PRIMARY KEY,
   issue_body text,
   issue_title text,
   posted_by_who text,
    CREATED_AT DATE DEFAULT CURRENT_DATE
    EMAIL VARCHAR(255),
    FULLNAME VARCHAR(100),
    ID BIGSERIAL PRIMARY KEY,
    PASSWORD VARCHAR(255),
    UNIQUE (UNIQUE_ID, EMAIL)
    UNIQUE_ID TEXT,
   id BIGSERIAL PRIMARY KEY,
 );
 CREATE TABLE feedback (
 select TO_CHAR(to_timestamp('230629', 'DDMMYY'),'YYYY-MM-DD');
)
);
);
--                                                                                                             ENGINEER_ASSIGN_TIME TIME NOT NULL DEFAULT CURRENT_TIME,
--                                                                                                             IMEI TEXT, SERVICE_ORDER_NO VARCHAR(15),
--                                                                                                             JOB_ADDED_BY text, MODIFIED_BY_WHO text, REASSIGNENGINEER text, QC_COMMENT text, ISQCCHECKED boolean, QCCOMMENTS text, PARTSLIST varchar[])
--                                                                                                             TICKET text, ENGINEER_ANALYSIS text, PARTS_ORDERED_DATE text, PARTS_PENDING_DATE text, PARTS_ISSUED_DATE text, QC_COMPLETED_DATE text, REPAIR_COMPLETED_DATE text, DEPARTMENT text, DATE_MODIFIED DATE NOT NULL DEFAULT CURRENT_DATE,
--                                                                                                             UNIQUE_ID UUID DEFAULT GEN_RANDOM_UUID(),
--                                                                                                             WARRANTY text, CREATED_DATE text, CREATED_TIME text, MODEL text, ENGINEER text, -- DOUBT
-- ADD COLUMN created_date text,
-- ADD COLUMN created_time text,
-- ADD COLUMN date_modified DATE NOT NULL DEFAULT CURRENT_DATE
-- ADD COLUMN department text,
-- ADD COLUMN engineer text,
-- ADD COLUMN engineer_analysis text,
-- ADD COLUMN engineer_assign_date text,
-- ADD COLUMN engineer_assign_time text
-- ADD COLUMN fault text,
-- ADD COLUMN imei text,
-- ADD COLUMN in_house_status text,
-- ADD COLUMN model text,
-- ADD COLUMN parts_issued_date text,
-- ADD COLUMN parts_ordered_date text,
-- ADD COLUMN parts_pending_date text,
-- ADD COLUMN qc_completed_date text,
-- ADD COLUMN repair_completed_date text,
-- ADD COLUMN serial_number text,
-- ADD COLUMN service_order_no varchar(15),
-- ADD COLUMN ticket text,
-- ADD COLUMN warranty text,
-- ADD FOREIGN KEY (unit_id) REFERENCES units(id);
-- ALTER TABLE test_units_repairshpr
-- ALTER TABLE test_units_repairshpr
-- CREATE TABLE TESTS_REPAIRSHOPR_HHP(ID BIGSERIAL PRIMARY KEY,
-- ENGINEER_ASSIGN_DATE DATE NOT NULL DEFAULT CURRENT_DATE,
-- FAULT text, SERIAL_NUMBER text, IN_HOUSE_STATUS text, --DOUBT
-- SELECT * FROM test_units_repairshpr;
CREATE TABLE service_orders (
CREATE TABLE tests_repairshpr_hhp (
CREATE TABLE users (
created_date text,
DATE FORMATS
date_modified DATE NOT NULL DEFAULT CURRENT_DATE
department text,
engineer text, -- DOUBT
engineer_analysis text,
engineer_assign_date DATE NOT NULL DEFAULT CURRENT_DATE,
engineer_assign_time TIME NOT NULL DEFAULT CURRENT_TIME,
fault text,
id BIGSERIAL REFERENCES units (id),
imei TEXT,
in_house_status text, --DOUBT
INSERT INTO service_orders (service_order) VALUES("4261942103");
model text,
parts_issued_date text,
parts_ordered_date text,
parts_pending_date text,
qc_completed_date text,
repair_completed_date text,
repair_id BIGSERIAL PRIMARY KEY,
serial_number text,
service_order_no VARCHAR(15),
ticket text,
unique_id  uuid DEFAULT gen_random_uuid(), 
warranty text,