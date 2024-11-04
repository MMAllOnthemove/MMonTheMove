import { ChangeEventHandler } from "react";

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
export interface ISearchForm {
    filtering: string;
    setFiltering: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IHHPgspn {
    id: number;
    unique_id: string;
    service_order_no: string;
    date_booked: string;
    created_at: string;
    updated_at: string;
    model: string;
    warranty: string;
    engineer: string;
    fault: string;
    imei: string | number;
    serial_number: string;
    repairshopr_status: string;
    gspn_status: string;
    ticket_number: string;
    department: string;
    job_added_by: string;
    updated_by: string;
    reassign_engineer: string;
    parts_list: string[];
}
export interface IPageTitle {
    hasSpan: true | false;
    title: string | number;
    spanText?: string | number;
}
export type TTicketComment = {
    status?: string;
    comment_attributes?: [
        {
            subject?: string;
            tech?: string | undefined;
            body?: string;
            hidden?: boolean;
            do_not_email?: boolean;
        }
    ];
};
