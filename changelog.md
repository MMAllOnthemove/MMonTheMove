# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
