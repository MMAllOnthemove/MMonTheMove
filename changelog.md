# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.12] - 2025-01-17

### Added

-   ADH to list of service types file
-   ADHPackConfirm in IsHeaderInfo object, for creating a service order
-   adh booking on gspn
-   allow users to modify customer details and modify locally and on rs
-   link customer to said ticket
-   Group visits by how many jobs
-   filter by status
-   show ticket number and service order number(s) in the daily customers visit table
-   adjust the customers table to add a column for rs id
-   join the tech table with the customers table by rs customer id and just get the ticket for the current day
-   in the ui, show the unit count
-   clicking on the row, show those units’ ticket numbers (sort sort them desc)
-   show recent ticket in the customer visit list ui table
-   backup_terms table
-   technician_tasks_images table
-   book from service order page
-   can create ticket from data pulled on gspn
-   can add attachments

### Fixed

-   not adding jobs booked to booking agent stats (does this as soon as a ticket is created)
-   Toggle unassigned filter should “unfilter”
-   allow editing fields in create tookan task
-   added columns accessories_and_condition and requires_backup
-   clear fields on hhp modify tasks close
-   block adding duplicate parts on one task
-   no longer requiring email

## [0.1.11] - 2025-01-11

### Added

-   add order number input field (actually added in [0.1.10] - 2025-01-10)
-   device_location and job_repair_no columns
-   field for adding location
-   adh booking on rs

### Fixed

-   not showing checklist images for today’s checklist
-   parts not adding

## [0.1.10] - 2025-01-10

### Added

-   status dropdown in parts section
-   parts_order_id in the technician_tasks table
-   checkbox in create ticket (rs) to specify if unit is ADH (still needs work)

### Fixed

-   remove comment after commenting on parts tab
-   clear part search input field after closing modal or after searching

## [0.1.9] - 2025-01-08

### Added

-   dismissible toast in create ticket and create service order
-   router.back() after creating customer (this works since we are using router.push())
-   show ticket number or service order for an hour at least after creation
-   loading effect on dynamic imports on create service order
-   useTransition() in welcome, customers list screens

### Fixed

-   clear fields after creating customer

## [0.1.8] - 2025-01-07

### Added

-   add a button on the engineer list that will pull data from the gspn engineer list api and adds it to the engineer table locally
-   we will only add the repairshopr id manually
-   if engineer exists, skip

### Fixed

-   button text - ‘create new asset’ instead of just ‘create’ on assets screen
-   create ticket is writing numbers instead of words (rs) and backup requires (rs changed it's codes, again!)
-   make the customer search field only show that customer (fixed in version [0.1.7])

## [0.1.7] - 2025-01-06

### Added

-   capitalize only first letter of every customer name (added in version [0.1.7])
-   make it user friendly

### Fixed

-   button text - ‘create new asset’ instead of just ‘create’ on assets screen
-   create ticket is writing numbers instead of words (rs) and backup requires (rs changed it's codes, again!)
-   make the customer search field only show that customer (fixed in version [0.1.7])

## [0.1.7] - 2025-01-04

### Added

-   native html select input for engineers and status in the modify task modal (hhp tasks)
-   temporarily turned off warranty change until we resolve it from repairshopr's side
-   time summary in modify tasks now calculates based on hours and caters for null assessment date
-   pagination on customer visits table
-   searchable as well
-   add field for special requirements called (additional_info)
-   highlist entire row on clicked
-   move the comment in parts tab to added parts section (makes logical sense)

### Fixed

-   adding a task via gspn, ticket number field was flickering (hhp tasks)
-   window.location.reload() for updating hhp tasks
-   success and error handling for creating a service order and ticket
-   creating and searching existing customer now capitalizes first letter of the first and last name
-   find out why units are added without warranty available
-   assessment date is not being set properly
-   not attaching user id if the technician is not reassigned (was only setting current tech)

## [0.1.6] - 2025-01-02

### Added

-   ‘more info’ in parts tab as well

### Fixed

-   pull all data and not limited to a specific year
-   if imei from assets does not work, use one from assets (adding hhp task using repairshopr api)
-   search in table now works even for cells that share values e.g (service order no / ticket number)
-   add customer button sometimes not working
-   change ‘add customer’ button text to just ‘Next’
-   not searching table properly

## [0.1.5] - 2024-12-30

### Added

-   custom dialog (modal) for opening table row and attaching data (shadcn ui one froze for this)
-   view page for hhp task in full
-   adding parts, add title and body(parts)

### Fixed

-   combobox, removed: data-[disabled]:pointer-events-none from it's class
-   ui in the parts section (hhp tasks)
-   time summary not accurate

## [0.1.4] - 2024-12-24

### Added

-   provinces dropdown instead of typing in repairshopr create customer form
-   customers table and visits table
-   customers list in the navbar
-   booking agent fills in unit details
-   be able to attach assets from the table while booking (repairshopr purposes)
-   customer will fill in their details and signature
-   booking agent fills in unit details
-   include encodeURIComponent in the url for any screen that fetches single data and decodeURIComponent to decode
-   For the booking app/dashboard, show common faults and models, names of units
-   dashboard for hhp
-   navbar has to have a higher z index
-   so number and ticket number in same cell and column
-   oow (red) in the hhp tasks
-   first comment after creating ticket should had a \* to show booked from the app
-   move from combobox to full on select shadcn ui component on certain screens

### Fixed

-   update loading state for QC and HHP task

## [0.1.3] - 2024-12-20

### Added

-   an extra column in users table called 'permissions'
-   dynamic imports
-   removed rerendering from hooks
-   phone name under model
-   refetch data as soon as it is added or deleted or updated (hhp tasks)
-   add date calculations tab in time summary (hhp tasks)
-   after creating ticket, ask user if they want to create ticket
-   so/ warranty shares cell
-   serial number / imei shares cell

### Fixed

-   update checklist now working
-   not changing engineer name on rs from app sometimes
-   clear fields after creating service order
-   not working add task
-   flag empty cells

## [0.1.2] - 2024-12-17

### Added

-   "target": "ES5",
    "downlevelIteration": true to compilerOptions Object in the tsconfig.json
-   can create service order

### Fixed

-   mileage_after does not need to pull data as it is empty (single page checklist)
-   success messsage after creating checklist was not showing

## [0.1.1] - 2024-12-14

### Added

-   next service date, next kms, disc expiry when posting checklist
-   dtv/ha booking on app as well
-   use serial number as imei for ha
-   only admin can delete hhp tasks row
-   added an ON DELETE CASCADE constraint on the parts_for_tasks, and technician_tasks_comments table, making it easy to delete
-   'No driver' when there is no driver and just a regular checklist
-   for update and get single row, if no id return
-   accept="image/_,video/_, application/pdf" for file inputs and in multer (backend)
-   only admin can delete
-   edit the times in columns as we will be modifying in frontend (tanstack)
-   a table called devices which collects every known samsung phone
-   altered the technician_tasks table and added device_name column (wil not use it)
-   instead join where phone name from devices matches model number (first 8 characters)
-   department, model index on the hhp tasks table for faster queries, CREATE INDEX idx_tt_created_year ON technician_tasks (EXTRACT(YEAR FROM created_at));
-   CREATE INDEX idx_tt_department_gin ON technician_tasks USING gin (department gin_trgm_ops);
-   CREATE EXTENSION IF NOT EXISTS pg_trgm;
-   joined devices table to hhp tasks table to get the phone_name
-   phone_name in hhp techs table

### Fixed

-   add chevron down icon to indicate dropdown link
-   slash icon to divide navbar links
-   only fetch data per department using LIKE in postgres
-   refactor
-   timezone issue
-   for update and get single row, if no id return
-

## [0.0.13] - 2024-12-09

### Added

-   fuel consumption calculator

### Fixed

-   Speedomter spelling
-   Change warranty instead of 'Void warranty'

## [0.0.12] - 2024-12-07

### Added

-   cars table
-   db table for fuel consumption
-   deleting a part comment on repairshopr to show that part

### Fixed

-   horizontal scrollbar
-   compensation unchanging (checkbox)
-   fixed the job repair no not changing on update
-   fixed service order not updating in the app
-   show history checklists in a box

## [0.0.11] - 2024-12-04

### Added

-   Store comments locally and query them
-   add completed date and time
-   repair complete if QC passes
-   pull comments from repairshopr, the entire list (since we store each comment, we query along with it's parent ticket)

### Fixed

-

## [0.0.10] - 2024-12-03

### Added

-   show “unassigned” jobs
-   add the first comment on repairshopr after booking
-   service order field when creating a ticket
-   show description and quantity on added parts

### Fixed

-   send backup code and warranty as strings instead of integers!!!!!

## [0.0.9] - 2024-12-03

### Added

-   next_service_kms, license_disc_expiry as part of checklist update
-   next service date and next service kms (allow this to be updated)
-   License disk expiration date
-   send Job repair no as well otherwise it erases the one on repairshopr
-   loading states for creating asset, customer, ticket
-   show searched customer result in a table
-   can search via firstname, fullname, email or phone
-   can edit repairshopr customer details
-   can create repairshopr customer
-   can create asset
-   Allow booking agents to create tickets
-   add jobs created to the table, thereby eliminating the need to add tasks
-   when a ticket is created, add it to the system and omit engineer
-   compensation boolean column
-   can now add compensation for parts

### Fixed

-   send every property when updating repairshopr ticket including job repair no

## [0.0.8] - 2024-11-28

### Added

-   `server {
    client_max_body_size 50M; # Set upload limit
}` to the backend nginx file to increase the limit
-   Pagination not working
-   added columns imei, serial_number to the tanstack hhp tasks table

### Fixed

-   fix hooks rerender unnecessarily

## [0.0.7] - 2024-11-27

### Added

-   show checklist images
-   store checklist image address to db and just call it
-   picture of the disk each time checklist image are taken
-   allow adding checklist files images as update
-   Details of the phone in more info (hhp tasks)
-   added license_disc_expiry, next_service_kms
-   show the above columns in the checklist table
-   Red when service 30 days prior license or service
-   License disk expiration date

### Fixed

-   showed hhp status select input twice
-   yup validation accept 15 mb files
-   cors error when uploading files in production
-   update checklists mileage after
-   Last updated works fine
-   add tasks hhp has a required error
-   collected and colleted_date columns
-   allow only admin to update checklist next_service_date and mileage_after
-   edit row is now working when clicking edit button instead of the whole row

## [0.0.6] - 2024-11-23

### Added

-   allow voiding warranty from the app to repairshopr
-   add parts as comment from the app repairshopr
-   change parts status from the app to repairshopr

### Fixed

-   deleting parts refreshes the list
-   delete parts from task, do not reload window
-   adding part refreshes the list immediately

## [0.0.5] - 2024-11-22

### Added

-   Add a star or prefix to show where comment came from (displayed on rs)

### Fixed

-   Sort by date booked HHP tasks
-   ADH/IW

## [0.0.4] - 2024-11-21

### Added

-   Open navlinks on hover
-   total to units booked agents table
-   set warranty automatic
-   checklists, show cars, clicking cars gives you tabs for checklist

### Fixed

-   check if logged in user matches the engineer name, so only engineer can set auto assess
-   Update QC comment regardless of fail/pass

## [0.0.3] - 2024-11-20

### Added

-   allow to select engineer and show only that engineers tasks
-   navbar to navigate better and faster
-   ‘regular check, no callout’ as reason for making a checklist if there is no callout
-   qc comment for both failed and pass
-   when tech clicks row, open the job and auto add that as the assessment date
-   show the part desc fully when opening the parts tab
-   parts requested and parts requested date columns
-   booking agent check if task has HHP if not, error
-   for parts tab, show parts added
-   can delete those parts
-   booking agents show date booked instead data added to system

### Fixed

-   Sort engineers, drivers alphabetically
-   booking agents stats, modal overflow is now auto
-   changed column mileage_after bigserial to mileage_after text
-   rename column qc_fail_reason TO qc_comment
-   booking agent stats are not accurate
-   modify kms after to not set default

## [0.0.2] - 2024-11-15

### Added

-   ADH (IU) as warranty stat
-   clicking checklist summary modal row, show reasons if fail
-   mileage input that allows updating mileage after driver comes back
-   Show next service and km’s on table
-   repairshopr id on signup when user selects their username, select id as well from repairshopr
-   assign tasks to engineers on repairshopr while adding to our in house db
-   update assignee from our system to repairshopr
-   for booking agents, does not have to click agent, match it with logged in user, has to match assignee from rs (it uses the repairshopr user id for this) we will have to modify users table to add that column

### Fixed

-   fail checklist summary has rows not highlighting in red
-   checklist multistep has ’Horn’ twice, the correct was 'Hand brake' as the label
-   app loading speed

## [0.0.1] - 2024-11-14

### Added

-   window reload after updating HHP task(s)
-   NextTopLoader assists with fetching a route quicker
-   clear fields on submit
-   show model number in hhp table
-   logo on the sidebar now takes user to home
