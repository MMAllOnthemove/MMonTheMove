CREATE TYPE departments as ENUM('HHP', 'DTV', 'HA', 'Claims', 'Service tracking');

create type login_method_enum as ENUM('password', 'oauth', 'sso');

create type login_status_enum as ENUM('success', 'failure');

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
    date_added text,
    reset_token VARCHAR(255),
    reset_token_expires_at TIMESTAMP
);

CREATE TABLE login_history (
    id BIGSERIAL PRIMARY KEY,
    unique_id uuid DEFAULT gen_random_uuid(),
    user_id BIGSERIAL NOT NULL,
    login_timestamp TIMESTAMP,
    logout_timestamp TIMESTAMP,
    login_method login_method_enum,
    login_status login_status_enum,
    FOREIGN KEY (user_id) REFERENCES company_people(user_id)
);

CREATE INDEX idx_login_timestamp ON login_history (login_timestamp);