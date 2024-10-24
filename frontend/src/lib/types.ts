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
}
