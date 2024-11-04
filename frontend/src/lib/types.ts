export type LoginValues = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
};
export type SignupValues = {
    email: string;
    password: string;
};
export type ForgotPasswordValues = {
    email: string;
};
export type StoreValues = {
    store_name: string;
};
export type TuseIpaasGetSOList = {
    SvcOrderNo: string;
    ReqDate: string;
    Model: string;
    SerialNo: string;
    IMEI: string | null;
    WarrantyType: string;
    EngineerName: string;
    PostingDate: string;
}[];
export type TInternalGSPNData = {
    service_order_no: string;
};
export type closeModalInParent = {
    onSuccess?: () => void;
};
export type TBookingAgentData = {
    original: {
        id: string;
        unique_id: string;
        agent_firstname: string;
        agent_lastname: string;
        department: string;
    };
};
export type TColumns = {
    header: string;
    accessorKey: string;
}[];
export type VehicleInspection = {
    id: number;
    unique_id: string;
    reason_for_use: string;
    service_order_no: string;
    ticket_number: string;
    driver: string;
    foot_brakes: string;
    emergency_brake: string;
    steering_wheel: string;
    windshield: string;
    rear_window: string;
    windshield_wipers: string;
    headlights: string;
    tail_lights: string;
    turn_indicator_lights: string;
    stop_lights: string;
    front_seat_adjustment: string;
    doors: string;
    horn: string;
    speedometer: string;
    bumpers: string;
    muffler_exhaust_system: string;
    tires: string;
    interior_exterior_view_mirros: string;
    safety_belts: string;
    engine_start_stop: string;
    final_comment: string;
    next_service_date: Date;
    cost_of_service: number;
    created_by: string;
    updated_by: string;
    mileage: number;
    license_plate: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_year: string;
    vehicle_color: string;
    vehicle_type: string;
    triangle: string;
    car_jack: string;
    spare_wheel: string;
    hass: string;
    tools: string;
    created_at: Date;
    updated_at: Date;
}[];
export type TechniciansTableData = {
    original: {
        id: string;
        unique_id: string;
        service_order_no: string;
        date_booked: string;
        updated_at: string;
        stores: string;
        model: string;
        warranty: string;
        engineer: string;
        fault: string;
        imei: string;
        serial_number: string;
        unit_status: string;
        ticket_number: string;
        department: string;
        job_added_by: string;
        updated_by: null | string;
        assessment_date: string;
        parts_pending_date: string;
        parts_issued_date: string;
        parts_pending: boolean;
        parts_ordered_date: string;
        repairshopr_job_id: string;
        qc_complete: null | boolean;
        qc_date: string;
        parts_issued: null | boolean;
        repeat_repair: string;
        completed_date: string;
    };
};
export type ModifyTaskModalTechnicians = {
    id: string;
    unique_id: string;
    service_order_no: string;
    date_booked: string;
    updated_at: string;
    stores: string;
    model: string;
    warranty: string;
    engineer: string;
    fault: string;
    imei: string;
    serial_number: string;
    unit_status: string;
    ticket_number: string;
    department: string;
    job_added_by: string;
    updated_by: null | string;
    assessment_date: string;
    parts_pending_date: string;
    parts_issued_date: string;
    parts_pending: boolean;
    parts_ordered_date: string;
    repairshopr_job_id: string | number | undefined;
    qc_complete: null | boolean;
    qc_date: string;
    parts_issued: null | boolean;
    repeat_repair: string;
    completed_date: string;
};
export type TAgentTasks = {
    id: number;
    unique_id: string;
    ticket_number: string;
    booking_agent: string;
    department: string;
    created_at: string;
    createdBy?: string | undefined;
    tasksCount?: number;
};
export type TBookingAgentsTasksCount = {
    booking_agent?: string;
    createdBy?: string | undefined;
    tasksCount: number;
};
export type TBookingAgentsTasksViewIndieList = {
    id?: string;
    unique_id?: string;
    ticket_number?: string;
    createdBy?: string;
    booking_agent?: string;
    created_at?: string;
};
export type TicketData = {
    tickets: [
        {
            id?: number;
            number?: string;
            subject?: string;
            created_at?: string; // ISO 8601 date string
            customer_id?: number;
            customer_business_then_name?: string;
            due_date?: string; // ISO 8601 date string
            resolved_at?: string | null; // ISO 8601 date string or null
            start_at?: string | null; // ISO 8601 date string or null
            end_at?: string | null; // ISO 8601 date string or null
            location_id?: number | null;
            location_name?: string | null;
            problem_type?: string;
            status?: string;
            ticket_type_id?: number;
            ticket_type_name?: string;
            properties?: {
                IMEI?: string;
                "PO No."?: string;
                Password?: string;
                Warranty?: string;
                "Item Condition"?: string;
                "Location (BIN)"?: string;
                "Backup Requires"?: string;
                "Job Repair No."?: string;
                "Part seal number"?: string;
                "Service Order No."?: string;
                "Special Requirement "?: string;
            };
            user_id?: number;
            updated_at?: string; // ISO 8601 date string
            pdf_url?: string | null;
            priority?: string | null;
            billing_status?: string;
            tag_list?: string[];
            sla_name?: string | null;
            creator_name_or_email?: string | null;
            contact_fullname?: string | null;
            contract_name?: string | null;
            address_id?: number | null;
            parent?: boolean;
            child?: boolean;
            recurring?: boolean;
            customer_reply?: boolean;
            comments?: Comment[];
            // user?: User;
        }
    ];
};
export type getSOInfoAllLogInfoSection = {
    AscCode?: string;
    Channel?: string;
    ChangedBy?: string;
    StReason?: string;
    StReasonDesc?: string;
    SeqNo?: string;
    ChangedDate?: string; // YYYYMMDD format
    ChangedTime?: string; // HHMMSS format
    Status?: string;
    SOComment?: string;
    StatusDesc?: string;
};
export type RepairshorTicketComment = {
    subject: string;
    tech: string | undefined;
    body: string;
    hidden: boolean;
    do_not_email: boolean;
    sms_body?: string;
};
export type RepairshoprPutTicket = {
    customer_id?: number;
    ticket_type_id?: number;
    number?: string;
    subject?: string;
    due_date?: string; // ISO 8601 date string
    start_at?: string; // ISO 8601 date string
    end_at?: string; // ISO 8601 date string
    location_id?: number;
    problem_type?: string;
    status?: string;
    user_id?: number;
    properties?: {
        IMEI: string;
        "PO No.": string;
        Password: string;
        Warranty: string;
        "Item Condition": string;
        "Location (BIN)": string;
        "Backup Requires": string;
        "Job Repair No.:": string;
        "Part seal number": string;
        "Service Order No.": string;
        "Special Requirement ": string;
    };
    asset_ids?: number[];
    signature_name?: string;
    signature_data?: string;
    sla_id?: number;
    contact_id?: number;
    priority?: string;
    outtake_form_data?: string;
    outtake_form_date?: string; // ISO 8601 date string
    outtake_form_name?: string;
    comments_attributes?: Comment[];
};

type Comment = {
    subject?: string;
    body?: string;
    hidden?: boolean;
    sms_body?: string;
    do_not_email?: boolean;
    tech?: string;
};
export type TEngineersListTable = {
    original: {
        id: string;
        unique_id: string;
        engineer_firstname: string;
        engineer_lastname: string;
        department?: string;
    };
};
export type TEngineersList = {
    id: string;
    unique_id: string;
    engineer_firstname: string;
    engineer_lastname: string;
    department?: string;
};
export type TStoresListTable = {
    original: {
        id: string;
        unique_id: string;
        store_name: string;
    };
};
export type TStoresList = {
    id: string;
    unique_id: string;
    store_name: string;
};
export type TTanstackPagination = {
    table: {
        setPageIndex?: (data: number) => void;
        getCanPreviousPage?: () => void;
        previousPage?: () => void;
        nextPage?: () => void;
        getCanNextPage?: () => void;
    };
};
export type CreateOtp = {
    created_by: string;
    otp_code: string;
};
export type HHPTaskAdd = {
    date_booked: string;
    model: string;
    warranty: string;
    engineer: string;
    fault: string;
    imei: string;
    serial_number: string;
    status: string;
    ticket_number: string;
    department: string;
    job_added_by: string;
    stores: string;
    repairshopr_job_id: string;
    repeat_repair: string;
};
export type EngineerAdd = {
    engineer_firstname: string;
    engineer_lastname: string;
    department: string;
};
export type DriverAdd = {
    driver_firstname: string;
    driver_lastname: string;
};
export type ClaimsAdd = {
    service_order_no?: string;
    ticket_number?: string;
    claim_status: string;
    department: string;
    created_by: string;
};
export type AgentsAdd = {
    agent_firstname: string;
    agent_lastname: string;
    department: string;
};
export type AgentsTask = {
    ticket_number: number;
    created_by: string;
    booking_agent: string;
};
export type ChecklistAdd = {
    reasonForUse?: string;
    driver?: string;
    footBrakes?: string;
    emergencyBrake?: string;
    steeringWheel?: string;
    windshield?: string;
    rearWindow?: string;
    windshieldWipers?: string;
    headlights?: string;
    tailLights?: string;
    turnIndicatorLights?: string;
    stopLights?: string;
    frontSeatAdjustment?: string;
    doors?: string;
    horn?: string;
    speedometer?: string;
    bumpers?: string;
    mufflerExhaustSystem?: string;
    tires?: string;
    interiorExteriorViewMirrors?: string;
    safetyBelts?: string;
    engineStartStop?: string;
    createdBy?: string;
    mileage?: string;
    licensePlate?: string;
    triangle?: string;
    carJack?: string;
    spareWheel?: string;
    hass?: string;
    tools?: string;
};
