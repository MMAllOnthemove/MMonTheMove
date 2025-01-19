# Useful commands to remember

## Install PostgreSQL

```
sudo apt update
apt install postgresql postgresql-contrib
```

### Check PostgreSQL status

`service postgresql status`

### Start Using PostgreSQL Command Line Tool

`sudo -u postgres psql`

### Check details of your connection

`\conninfo`

### List of all the databases that are available on a server

`\l`

### List of all the users with their privileges

`\du`

### Since the default “postgres” user does not have a password, you should set it yourself

`\password postgres`

### Create and Populate a New Database

`CREATE DATABASE test_erp;`

### Connect to it

`\c test_erp`

### Create table with primary key

```
CREATE TABLE clients (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, role VARCHAR);
```

### Double check table is created

`\dt`

### Insert into new table

```
INSERT INTO clients (first_name, last_name, role) VALUES ('John', 'Smith', 'CEO');
```

### Get all rows

`SELECT * FROM clients;`

### Setup PostgreSQL server

Let’s now exit the interactive psql session by typing exit, and access `postgresql.conf` configuration file of PostgreSQL version 14 by using vim text editor

`vim /etc/postgresql/14/main/postgresql.conf`

Uncomment and edit the listen_addresses attribute to start listening to start listening to all available IP addresses.

`listen_addresses = '*'`

Now edit the PostgreSQL access policy configuration file.

`vim /etc/postgresql/14/main/pg_hba.conf`

Append a new connection policy (a pattern stands for `[CONNECTION_TYPE][DATABASE][USER] [ADDRESS][METHOD])` in the bottom of the file.

`host all all 0.0.0.0/0 md5`

We are allowing TCP/IP connections (`host`) to all databases (`all`) for all users (`all`) with any IPv4 address (`0.0.0.0/0`) using an MD5 encrypted password for authentication (`md5`).

It is now time to restart your PostgreSQL service to load your configuration changes.

`systemctl restart postgresql`

And make sure your system is listening to the 5432 port that is reserved for PostgreSQL.

`ss -nlt | grep 5432`

### Connect to PostgreSQL database through a remote host

-   Connect via Command Line Tool
-   You may now connect to a remote database by using the following command pattern:

`psql -h [ip address] -p [port] -d [database] -U [username]`

`e.g. psql -h 5.199.162.56 -p 5432 -d test_erp -U postgres`

Double check connection details

`\conninfo`

Now you can start writing SQL queries to retrieve data from your database tables.

`SELECT * FROM clients;`

Copy data from a csv without commas

```sql COPY devices (company, marketing_name, device, device_model)
FROM '/root/sites/supported_devices.csv'
DELIMITER ';'
CSV HEADER
NULL '';

```

Copy data from a csv with commas

```sql COPY devices (company, marketing_name, device, device_model)
FROM '/root/sites/supported_devices.csv'
DELIMITER ','
CSV HEADER;
```

<!-- In both instances, rows have to all be filed and file should exist in the server -->

## Extensions added

`sql CREATE EXTENSION IF NOT EXISTS pg_trgm; `

## INDEXES used

a. Index on created_at for Year Filtering
Filtering on the created_at year is a common operation. Adding a functional index on EXTRACT(YEAR FROM created_at) can improve performance:
`sql CREATE INDEX idx_tt_model_prefix ON technician_tasks (LEFT(model, 8)); `

b. Index for department
Since you’re filtering rows with tt.department LIKE '%HHP%', you can optimize by using a GIN or BTREE index on department with a text pattern search:

`sql CREATE INDEX idx_tt_department_gin ON technician_tasks USING gin (department gin_trgm_ops); `

c. Index for model (substring match)
Because you're matching the first 8 characters of model, create an index on the substring to speed up joins:

`sql CREATE INDEX idx_tt_model_prefix ON technician_tasks (LEFT(model, 8)); `

d. Index on devices.device_model
Similarly, index the device_model prefix in the devices table:

`sql CREATE INDEX idx_devices_model_prefix ON devices (LEFT(device_model, 8)); `

### Connect via GUI Client (pgAdmin)

After installing pgAdmin 4 and running it you will get to a standard pgAdmin 4 dashboard.

-   Press `Add New Server` button and enter the information of your remote server.
-   Enter your connection details
-   After saving your credentials you will be automatically connected to a remote database server.
-   You may now open a Query Tool for your selected database `test_er` and start writing your queries.

Links

[Installing PostgreSQL](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)

Notes

Selecting date and formating from 6 digits

`SELECT to_char(to_timestamp('310322', 'DDMMYY'),'YYYY-MM-DD')`

<!-- Calculate date_completed -->

`(repair_completed_date::date - created_date::date) AS completed_days`

<!-- Count jobs done by specific engineer -->

`SELECT count(DISTINCT service_order_no) FROM units WHERE engineer = '[name]'`

<!-- Count jobs that have the in house status 'Booked in' -->

`SELECT count(DISTINCT service_order_no) FROM units WHERE in_house_status = 'Booked in'`

<!-- Count total jobs that have any status besides 'repair completed -->

`SELECT count(DISTINCT service_order_no) AS pending FROM units WHERE in_house_status = 'Booked in' OR in_house_status = 'Waiting for customer'`

`SELECT count(DISTINCT service_order_no) AS pending FROM units WHERE NOT in_house_status = 'Booked in'`

<!-- Show service_order_no and engineer -->

`SELECT DISTINCT service_order_no, engineer from units`

<!-- Count number of jobs that have in house status 'Repair complete' -->

`SELECT count(DISTINCT service_order_no)  AS complete_count FROM units WHERE in_house_status = 'Repair complete'`

<!-- Get jobs booked in today -->

`select * from units where DATE(created_date) = '2023-06-12'`

<!-- Select all jobs for one week -->

`select distinct count( *) from units WHERE (DATE(created_date) >= date_trunc('week', CURRENT_TIMESTAMP - interval '1 week') and DATE(created_date) < date_trunc('week', CURRENT_TIMESTAMP));`

<!-- Select all jobs for one month -->

`select distinct * from units WHERE (DATE(created_date) >= date_trunc('month', CURRENT_TIMESTAMP - interval '1 month') and DATE(created_date) < date_trunc('month', CURRENT_TIMESTAMP))`

<!-- Added a constraint on so number -->
<!-- ALTER TABLE units ADD CONSTRAINT service_order_no_unique UNIQUE (service_order_no); -->

<!-- LEFT JOIN REPAIR TABLE WITH GSPN TABLE -->

<!-- SELECT * FROM tests_repairshpr_hhp LEFT JOIN units ON tests_repairshpr_hhp.id = units.id; -->
<!-- For month -->
<!-- SELECT id, unique_id, (SELECT DISTINCT service_order_no) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, date_modified, gspn_status FROM units
WHERE date_modified >= date_trunc('month', current_date - interval '1' month)
AND date_modified < date_trunc('month', current_date); -->

<!-- Reporting -->
<!-- SELECT id, unique_id, (SELECT DISTINCT service_order_no) AS service_order_no, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, date_modified, gspn_status FROM units
WHERE date_modified >= date_trunc('month', current_date - interval '1' month)
AND date_modified < date_trunc('month', current_date); -->

<!-- Select data for previous day -->
<!-- SELECT
(service_order_no) AS yesterday, date_modified FROM units WHERE date_modified ::date = current_date - 1; -->
<!-- DELETE DUPLICATE ROWS -->
<!-- DELETE FROM units
WHERE service_order_no IN
    (SELECT service_order_no
    FROM
        (SELECT service_order_no,
         ROW_NUMBER() OVER( PARTITION BY service_order_no
        ORDER BY  service_order_no ) AS row_num
        FROM units ) t
        WHERE t.row_num > 1 ); -->
