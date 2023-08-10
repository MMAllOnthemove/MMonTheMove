CREATE TABLE service_orders (
   id BIGSERIAL PRIMARY KEY,
unique_id  uuid DEFAULT gen_random_uuid(), 
-- ALTER TABLE test_units_repairshpr
-- ADD FOREIGN KEY (unit_id) REFERENCES units(id);
-- SELECT * FROM test_units_repairshpr;
-- ALTER TABLE test_units_repairshpr
-- ADD COLUMN service_order_no varchar(15),
-- ADD COLUMN created_date text,
-- ADD COLUMN created_time text,
-- ADD COLUMN model text,
-- ADD COLUMN warranty text,
-- ADD COLUMN engineer text,
-- ADD COLUMN fault text,
-- ADD COLUMN imei text,
-- ADD COLUMN serial_number text,
-- ADD COLUMN in_house_status text,
-- ADD COLUMN engineer_assign_date text,
-- ADD COLUMN engineer_assign_time text
-- ADD COLUMN ticket text,
-- ADD COLUMN engineer_analysis text,
-- ADD COLUMN parts_ordered_date text,
-- ADD COLUMN parts_pending_date text,
-- ADD COLUMN parts_issued_date text,
-- ADD COLUMN qc_completed_date text,
-- ADD COLUMN repair_completed_date text,
-- ADD COLUMN department text,
-- ADD COLUMN date_modified DATE NOT NULL DEFAULT CURRENT_DATE
 );





CREATE TABLE users (
    ID BIGSERIAL PRIMARY KEY,
    UNIQUE_ID TEXT,
    FULLNAME VARCHAR(100),
    EMAIL VARCHAR(255),
    PASSWORD VARCHAR(255),
    CREATED_AT DATE DEFAULT CURRENT_DATE

    UNIQUE (UNIQUE_ID, EMAIL)
);

INSERT INTO service_orders (service_order) VALUES("4261942103");

DATE FORMATS
 select TO_CHAR(to_timestamp('230629', 'DDMMYY'),'YYYY-MM-DD');


 CREATE TABLE feedback (
	id BIGSERIAL PRIMARY KEY,
	issue_title text,
	issue_body text,
	posted_by_who text,
	date_created date default current_date


);

CREATE TABLE test_units_repairshpr (
id BIGSERIAL PRIMARY KEY,
unit_id BIGSERIAL
-- ALTER TABLE test_units_repairshpr
-- ADD FOREIGN KEY (unit_id) REFERENCES units(id);
-- SELECT * FROM test_units_repairshpr;
-- ALTER TABLE test_units_repairshpr
-- ADD COLUMN service_order_no varchar(15),
-- ADD COLUMN created_date text,
-- ADD COLUMN created_time text,
-- ADD COLUMN model text,
-- ADD COLUMN warranty text,
-- ADD COLUMN engineer text,
-- ADD COLUMN fault text,
-- ADD COLUMN imei text,
-- ADD COLUMN serial_number text,
-- ADD COLUMN in_house_status text,
-- ADD COLUMN engineer_assign_date text,
-- ADD COLUMN engineer_assign_time text
-- ADD COLUMN ticket text,
-- ADD COLUMN engineer_analysis text,
-- ADD COLUMN parts_ordered_date text,
-- ADD COLUMN parts_pending_date text,
-- ADD COLUMN parts_issued_date text,
-- ADD COLUMN qc_completed_date text,
-- ADD COLUMN repair_completed_date text,
-- ADD COLUMN department text,
-- ADD COLUMN date_modified DATE NOT NULL DEFAULT CURRENT_DATE
-- ;

);

CREATE TABLE tests_repairshpr_hhp (
id BIGSERIAL REFERENCES units (id),
repair_id BIGSERIAL PRIMARY KEY,
unique_id  uuid DEFAULT gen_random_uuid() REFERENCES units (uuid), 
imei TEXT  REFERENCES units (imei),
service_order_no VARCHAR(15) REFERENCES units (service_order_no),
warranty text REFERENCES units (warranty),
created_date text,
model text REFERENCES units (model),
engineer text REFERENCES units (engineer), -- DOUBT
fault text,
serial_number text REFERENCES units (serial_number),
in_house_status text REFERENCES units (in_house_status), --DOUBT
engineer_assign_date text = created_date,
engineer_assign_time text,
ticket text,
engineer_analysis text REFERENCES units (engineer_analysis),
parts_ordered_date text REFERENCES units (parts_ordered_date),
parts_pending_date text REFERENCES units (parts_pending_date),
parts_issued_date text REFERENCES units (parts_issued_date),
qc_completed_date text REFERENCES units (qc_completed_date),
repair_completed_date text REFERENCES units (repair_completed_date),
department text REFERENCES units (department),
date_modified DATE NOT NULL DEFAULT CURRENT_DATE
)