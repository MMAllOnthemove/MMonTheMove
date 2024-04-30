import { boolean } from "yup";

export interface Itable {
  id: string | number;
  unique_id: string;
  service_order_no: string;
  created_date: string;
  model: string;
  warranty: string;
  engineer: string;
  fault: string;
  imei: string;
  serial_number: string;
  in_house_status: string;
  engineer_assign_date: string;
  ticket: string;
  engineer_analysis: string;
  parts_ordered_date: string | boolean;
  parts_pending_date: string | boolean;
  parts_issued_date: string | boolean;
  qc_completed_date: string | boolean;
  repair_completed_date: string | boolean;
  department: string;
  reassign_engineer: string;
  parts_list: string[];
  is_qc_checked: string | boolean;
  qc_comment: string | boolean;
  date_modified: string;
  gspn_status: string;
}

export interface IButton {
  onClick?: () => void;
  type: "submit" | "button";
  className: string;
  text: string;
  color?: string; // optional because we can style using tailwind
}
export interface IHomepageModalTabOneContent {
  searchServiceOrder: string;
  setSearchServiceOrder: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warranty: string;
  inHouseStatus: string;
  setInHouseStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ticket: string;
  setTicket: (e: React.ChangeEvent<HTMLInputElement>) => void;
  engineerAnalysis?: string;
  setEngineerAnalysis?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  engineer: string;
  setEngineer: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  department: string;
  setDepartment: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // user: string;
  // setUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postData: (e: React.SyntheticEvent) => void;
}
export interface IPartsModalTabOneContent extends IHomepageModalTabOneContent {
  dispatchAnalysis?: string;
  setDispatchAnalysis?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}
export interface IDtvModalAddTaskContent {
  searchServiceOrder: string;
  setSearchServiceOrder: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warranty: string;
  ticket: string;
  setTicket: (e: React.ChangeEvent<HTMLInputElement>) => void;
  engineer: string;

  postData: (e: React.SyntheticEvent) => void;
}

export interface IContainerWrapper {
  children: React.ReactNode;
}
export interface IHomepageModalTabTwoContent {
  searchTicket: string | number;
  setSearchTicket: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairFault: string | undefined;
  repairWarranty: string | undefined;
  setRepairWarranty: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  repairImei: string | number | undefined;
  setRepairImei: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairSerialNumber: string | number | undefined;
  setRepairSerialNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairModel: string | undefined;
  setRepairModel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairInHouseStatus: string | undefined;
  setRepairInHouseStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  repairEngineer: string | undefined;
  setRepairEngineer: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  postRepairData: (e: React.SyntheticEvent) => void;
  repairAPILoading: boolean;
}

export interface ISearchForm {
  filtering: string;
  setFiltering: (e: any) => string | any;
}
export interface IUnitsPendingCard {
  cardParagraph: string | number;
  cardHeading: string | number | string[] | number[] | any;
  onClick?: () => void;
}
export interface IfetchDataCombinedData {
  setTableData: (order: string | any) => void;
}
export interface IgetBookingAgentJobs {
  setGetBookingAgentJobsData: (order: string | any) => void;
}
export interface IgetSOInfoAll {
  searchServiceOrder: string;
  setServiceOrder: (order: string) => void;
  setCreatedDate: (order: string) => void;
  setCreatedTime: (order: string) => void;
  setModel: (order: string) => void;
  setWarranty: (order: string) => void;
  setFault: (order: string) => void;
  setImei: (order: string) => void;
  setSerialNumber: (order: string) => void;
  setEngineerAssignDate: (order: string) => void;
  setEngineerAssignTime: (order: string) => void;
  setGSPNStatus: (order: string) => void;
}
export interface IgetSOInfoAllDtv {
  searchServiceOrder: string;
  setAcknowledgeDate: (order: string) => void;
  setAcknowledgeTime: (order: string) => void;
  setEngineerAssignDate: (order: string) => void;
  setEngineerAssignTime: (order: string) => void;
  setEngineer: (order: string) => void;
  setModel: (order: string) => void;
  setRemark: (order: string) => void;
  setSerialNumber: (order: string) => void;
  setServiceOrder: (order: string) => void;
  setCreatedDate: (order: string) => void;
  setCreatedTime: (order: string) => void;
  setWarranty: (order: string) => void;
  setWarrantyRepairType: (order: string) => void;
  setFault: (order: string) => void; //Defect Desc
  setImei: (order: string) => void;
  setCustomerEmail: (order: string) => void;
  setCustomerFirstName: (order: string) => void;
  setCustomerLastName: (order: string) => void;
  setCustomerStreetAddress: (order: string) => void;
  setCustomerStreetAddressTwo: (order: string) => void;
  setCustomerCity: (order: string) => void;
  setCustomerCountry: (order: string) => void;
  setCustomerProvince: (order: string) => void;
  setCustomerDistrict: (order: string) => void;
  setCustomerHomePhone: (order: string) => void;
  setCustomerMobilePhone: (order: string) => void;
}

export interface IgetSOInfoAllParts {
  searchServiceOrder: string;
  setServiceOrder: (order: string) => void;
  setModel: (order: string) => void;
  setWarranty: (order: string) => void;
  setFault: (order: string) => void;
  setImei: (order: string) => void;
  setSerialNumber: (order: string) => void;
  setEngineer?: (order: string) => void;
}
export interface IgetSOStatusDescLatest {
  showServiceOrderNumber: string;
  setGSPNStatus: (order: string) => void;
}
export interface IgetPartsInfo {
  debouncedSearch: string | any;
  setData: (data: any) => void;
}
export interface IpostBookingAgentsJobs {
  searchServiceOrder: string;
  setServiceOrder: (order: string) => void;
  setCreatedDate: (order: string) => void;
  setCreatedTime: (order: string) => void;
  setWarranty: (order: string) => void;
}

export interface IgetRepair {
  searchTicket: string | number;
  setRepairFault: (order: string) => void;
  setRepairCreatedDate: (order: string) => void;
  setRepairCreatedTime: (order: string) => void;
  setRepairEngineerAssignDate: (order: string) => void;
  setRepairEngineerAssignTime: (order: string) => void;
  setRepairImei: (order: string) => void;
  setRepairServiceOrder: (order: string) => void;
  setRepairTicket: (order: string) => void;
  setRepairEngineerAnalysis: (order: string) => void;
  setRepairDepartment: (order: string) => void;
  setRepairAPILoading: (order: boolean) => void;
}
export interface IgetTicketNumberOnJobAdd {
  searchServiceOrder: string;
  setTicket: (order: string) => void;
}
export interface IRepairTicketInfo {
  searchTicketNumber: string;
  setTicketNumber: (order: string) => void;
}
export interface IRepairTicketId {
  ticket: string | number;
  setTicketId: (order: string) => void;
}
export interface IgetStockOverviewInfo {
  debouncedSearch: string | any;
  setStockData: (stockDataResponse: any) => void;
}

export interface ISignUpFormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
}
export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IcustomToast {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  duration: number;
  isClosable: boolean;
}
export interface IBookingAgentsJobDataModal {
  children?: React.ReactNode;
  getBookingAgentJobsData: string[] | any;
  dateFrom: string | any;
  dateTo: string | any;
}
export interface IUnitsPendingJobDataModal {
  children?: React.ReactNode;
  fetchAlldata: string[] | any;
  fetchJobsApprovedAndRejected: string[] | any;
  dateFrom: string | any;
  dateTo: string | any;
}

export interface IPopupModal {
  isVisible: true | false;
  title: string | number | any;
  content: string | number | boolean | React.ReactNode | any;
  onClose: () => void;
  footer?: string | number | boolean | React.ReactNode | any;
}

export interface ISingleDTVJob {
  id: string | number;
  engineer: string;
  model: string;
  serial_number: string;
  service_order_no: string;
  created_date: string;
  warranty: string;
  warranty_repair_type: string;
  fault: string;
  imei: string;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_street_address: string;
  customer_street_address_two: string;
  customer_city: string;
  customer_country: string;
  customer_province: string;
  customer_district: string;
  customer_homephone: string;
  customer_mobilephone: string;
  ticket: string;
  parts_list: string[];
  added_by: null;
  added_on: string;
  engineer_phone_number: string;
  job_status: boolean;
  ticket_number_id: string;
}

export interface IgetSOInfoTookan {
  serviceOrder: string;
  setFirstname: (order: string) => void;
  setLastname: (order: string) => void;
  setEmail: (order: string) => void;
  setPhone: (order: string) => void;
  setFault: (order: string) => void;
  setAddress: (order: string) => void;
  setAddress2: (order: string) => void;
  setCity: (order: string) => void;
  setState: (order: string) => void;
  setCountry: (order: string) => void;
  setZip: (order: string) => void;
}
