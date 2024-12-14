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
export type TUser = {
    user_id: number;
    user_unique_id: string;
    email: string;
    full_name: string;
    user_role: string;
    repairshopr_id: number;
    department: string;
};
export type TUpdateAssessmentDate = {
    assessment_date: string;
    units_assessed: boolean;
};
export type PropertiesType = {
    IMEI?: string;
    Warranty?: string;
    "Warranty "?: string;
    "Backup Requires"?: string;
    "Item Condition"?: string;
    "Item Condition "?: string;
    "Location (BIN)"?: string;
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
    car: string;
    reason_for_use: string;
    service_order_no: string;
    ticket_number: string;
    driver: string;
    foot_brakes: string;
    foot_brakes_fail_reason: string;
    emergency_brake: string;
    emergency_brake_fail_reason: string;
    steering_wheel: string;
    windshield: string;
    windshield_fail_reason: string;
    rear_window: string;
    rear_window_fail_reason: string;
    windshield_wipers: string;
    windshield_wipers_fail_reason: string;
    headlights: string;
    headlights_fail_reason: string;
    tail_lights: string;
    turn_indicator_lights: string;
    turn_indicator_lights_fail_reason: string;
    stop_lights: string;
    stop_lights_fail_reason: string;
    front_seat_adjustment: string;
    front_seat_adjustment_fail_reason: string;
    doors: string;
    doors_fail_reason: string;
    horn: string;
    speedometer: string;
    speedometer_fail_reason: string;
    bumpers: string;
    bumpers_fail_reason: string;
    muffler_exhaust_system: string;
    muffler_exhaust_system_fail_reason: string;
    tires: string;
    tires_fail_reason: string;
    interior_exterior_view_mirros: string;
    interior_exterior_view_mirros_fail_reason: string;
    safety_belts: string;
    safety_belts_fail_reason: string;
    engine_start_stop: string;
    engine_start_stop_fail_reason: string;
    tail_lights_fail_reason: string;
    final_comment: string;
    next_service_date: string;
    cost_of_service: number;
    created_by: string;
    updated_by: string;
    license_disc_expiry: string;
    next_service_kms: string;
    mileage: number;
    license_plate: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_year: string;
    vehicle_color: string;
    vehicle_type: string;
    triangle: string;
    triangle_fail_reason: string;
    car_jack: string;
    car_jack_fail_reason: string;
    spare_wheel: string;
    spare_wheel_fail_reason: string;
    hass: string;
    hass_fail_reason: string;
    horn_fail_reason: string;
    mileage_after: string | number | any;
    tools: string;
    tools_fail_reason: string;
    created_at: string;
    updated_at: string;
    image_urls: [] | any;
};
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
    parts_requested_date: string;
    repairshopr_job_id: string | number | undefined;
    qc_complete: null | boolean;
    qc_date: string;
    parts_issued: null | boolean;
    repeat_repair: string;
    completed_date: string;
};
export type TAgentTasks = {
    id?: number;
    unique_id?: string;
    ticket_number?: string;
    booking_agent?: string | undefined | any;
    department?: string;
    created_at?: string;
    original_ticket_date?: string;
    tickets?: string[];
    count?: number;
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
            comments?: {
                id: number;
                ticket_id: number;
                subject: string;
                body: string;
                tech: string;
                created_at: string;
                updated_at: string;
                hidden: boolean;
                sms_body: string | null;
                user_id: number;
                ticket_automation_id: string | number | null;
                destination_emails: string;
                account_id: number;
                email_sender: string | null;
                new_sms_body: string | null;
                is_rich_text: boolean;
                display_order: string | null;
            }[];
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
        IMEI?: string;
        "PO No."?: string;
        Password?: string;
        Warranty?: string | any;
        "Item Condition"?: string | any;
        "Location (BIN)"?: string | any;
        "Backup Requires"?: string | any;
        "Job Repair No.:"?: string | any;
        "Part seal number"?: string | any;
        "Service Order No."?: string | any;
        "Special Requirement "?: string | any;
        "Warranty "?: string | any;
        "Item Condition "?: string | any;
        "Backup Requires "?: string | any;
        "Service Order No. "?: string;
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
export type CarAdd = {
    plate_number: string;
    car_model: string;
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
export type TDevices = {
    id: string;
    company: string;
    marketing_name: string;
    device: string;
    device_model: string;
};
export type THHPTasks = {
    id: string;
    unique_id: string;
    service_order_no: string | null;
    device_name?: string;
    date_booked: string;
    created_at: string | null;
    model: string | null;
    warranty: string | null;
    engineer: string | null;
    fault: string | null;
    imei: string | null;
    serial_number: string | null;
    repairshopr_status: string | null;
    gspn_status: string | null;
    ticket_number: string | null;
    department: string | null;
    job_added_by: string | null;
    assessment_date: string | null;
    parts_pending_date: string | null;
    parts_issued_date: string | null;
    parts_pending: string | null;
    stores: string | null;
    parts_ordered_date: string | null;
    qc_complete: string | boolean | null;
    repairshopr_job_id: string | number;
    unit_status: string | null;
    qc_complete_date: string | null;
    repair_completed: string | null;
};
export type TTaskParts = {
    id: string;
    unique_id: string;
    ticket_number: string;
    part_name: string;
    compensation?: boolean | null | undefined | any;
    part_desc: string;
    seal_number: string | null;
    part_quantity: number;
    parts_status: string | null;
    created_at: string;
    created_by: string;
    updated_at: string | null;
    stock_availability?: string;
    sales_status?: string;
};
export type TAddPart = {
    task_row_id?: string;
    ticket_number?: string;
    part_name?: string;
    part_desc?: string;
    compensation?: boolean | null | undefined | any;
    part_quantity?: number | undefined;
    created_at?: string;
    created_by?: string;
    setParts?: (data: any) => void;
};
export type Customer = {
    id?: number;
    firstname: string;
    lastname: string;
    fullname?: string;
    business_name?: string;
    email: string;
    phone: string;
    mobile: string;
    created_at?: string;
    updated_at?: string;
    pdf_url?: string | null;
    address: string;
    address_2?: string;
    city: string;
    state: string;
    zip: string;
    latitude?: number | null;
    longitude?: number | null;
    notes?: string | null;
    get_sms?: boolean;
    opt_out?: boolean;
    disabled?: boolean;
    no_email?: boolean;
    location_name?: string | null;
    location_id?: number | null;
    properties?: {
        "Reg No.": string;
        "Vat No.": string;
        notification_billing: string;
        notification_reports: string;
        notification_marketing: string;
    };
    online_profile_url?: string;
    tax_rate_id?: number | null;
    notification_email?: string;
    invoice_cc_emails?: string;
    invoice_term_id?: number | null;
    referred_by?: string;
    ref_customer_id?: number | null;
    business_and_full_name?: string;
    business_then_name?: string;
    contacts?: unknown[]; // Specify the type of contacts if more details are provided
};
export type CustomerResultRowClick = {
    original: {
        id?: number;
        firstname: string;
        lastname: string;
        fullname?: string;
        business_name?: string;
        email: string;
        phone: string;
        mobile: string;
        created_at?: string;
        updated_at?: string;
        pdf_url?: string | null;
        address: string;
        address_2?: string;
        city: string;
        state: string;
        zip: string;
        latitude?: number | null;
        longitude?: number | null;
        notes?: string | null;
        get_sms?: boolean;
        opt_out?: boolean;
        disabled?: boolean;
        no_email?: boolean;
        location_name?: string | null;
        location_id?: number | null;
        properties?: {
            "Reg No.": string;
            "Vat No.": string;
            notification_billing: string;
            notification_reports: string;
            notification_marketing: string;
        };
        online_profile_url?: string;
        tax_rate_id?: number | null;
        notification_email?: string;
        invoice_cc_emails?: string;
        invoice_term_id?: number | null;
        referred_by?: string;
        ref_customer_id?: number | null;
        business_and_full_name?: string;
        business_then_name?: string;
        contacts?: unknown[]; // Specify the type of contacts if more details are provided
    };
};
export type Meta = {
    total_pages: number;
    total_entries: number;
    per_page: number;
    page: number;
};

export type CustomerData = {
    customers: Customer[];
    meta: Meta;
};
