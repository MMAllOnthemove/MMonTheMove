CREATE TYPE departments as ENUM('HHP', 'DTV', 'HA', 'Claims', 'Service tracking');

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
