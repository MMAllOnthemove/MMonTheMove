# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
