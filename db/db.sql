CREATE TABLE service_orders (
    ID BIGSERIAL NOT NULL PRIMARY KEY,
    SERVICE_ORDER VARCHAR(10) NOT NULL UNIQUE,
    WARRANTY VARCHAR(3) NOT NULL,
    MODEL VARCHAR(20) NOT NULL UNIQUE,
    FAULT TEXT NOT NULL,
    IMEI VARCHAR(25) NOT NULL UNIQUE,
    SERIAL_NUMBER VARCHAR(30) NOT NULL UNIQUE,
    ENGINEER VARCHAR(50) NOT NULL,
    PARTS_ORDERED VARCHAR(20) NULL,
    PARTS_ISSUED VARCHAR(20) NULL
    );

INSERT INTO service_orders (service_order, warranty, model, fault, imei, serial_number, engineer, parts_ordered, parts_issued) 