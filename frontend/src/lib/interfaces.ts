export interface ISignUpFormValues {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    createdAt?: Date;
}
export interface ILoginFormValues {
    email: string;
    password: string;
}
export interface IForgotPasswordFormValues {
    email: string;
}
export interface IContainer {
    children: React.ReactNode;
}

export interface ITookanCreateTask {
    customer_email: string;
    order_id: string;
    customer_username: string;
    customer_phone: string | number;
    customer_address: string;
    job_description: string;
    job_pickup_datetime: string;
    job_delivery_datetime: string;
    job_pickup_latitude: string | number;
    job_pickup_longitude: string | number;
    has_pickup: string;
    has_delivery: string;
    layout_type: string;
    tracking_link: number;
    timezone: string;
    api_key: string;
}
export interface ITookanAssignToTeam {
    job_id: string;
    team_id: string;
    job_status: string;
    api_key: string;
}
