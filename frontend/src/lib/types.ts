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
    onChange?: (id: boolean) => void;
};
export type TBookingAgentData = {
    id: string;
    unique_id: string;
    agent_firstname: string;
    agent_lastname: string;
    department: string;
};
