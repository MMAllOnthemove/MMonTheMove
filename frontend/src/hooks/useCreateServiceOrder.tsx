import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TPayload = {
    IsCommonHeader: {
        Company: string;
        AscCode: string;
        Lang: string;
        Country: string;
        Pac: string;
    };
    IvCreationCheck: string;
    IsHeaderInfo: {
        AscJobNo: string;
    };
    IsBpInfo: {
        CustomerCode: string;
        Addrnumber: string;
    };
    IsModelInfo: {
        Model: string;
        SerialNo: string;
        IMEI: string;
        PurchaseDate: string;
        Accessory: string;
        DefectDesc: string;
        Remark: string;
        WtyException: string;
    };
    IsJobInfo: {
        SymCode1: string;
        SymCode2: string;
        SymCode3: string;
        SvcType: string;
        QueueTokenNo: string;
    };
    IsDateInfo: {
        RequestDate: string;
        RequestTime: string;
        UntRecvDate: string;
        UntRecvTime: string;
        FirstAppDate: string;
        FirstAppTime: string;
    };
    IsWtyInfo: {
        WtyConsType: string;
    };
    IsBpDetail: {
        CustFirstName: string;
        CustLastName: string;
        CustHomePhone: string;
        CustOfficePhone: string;
        CustMobilePhone: string;
        CustEmail: string;
        CustAddrStreet2: string;
        CustAddrStreet1: string;
        CustCity: string;
        CustState: string;
        CustZipcode: string;
        Country: string;
    };
};

const useCreateServiceOrder = () => {
    const [addServiceOrderLoading, setLoading] = useState(false); // Loading state
    const addServiceOrder = async (values: TPayload) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_IPAAS_API_CreateSO}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPAAS}`,
                    },
                }
            );
            console.log("gspn response data", data);

            if (data?.Return?.EvSvcOrderNo) {
                toast.success(
                    (t) => (
                        <span className="flex gap-2 justify-between">
                            Service order no: {data?.Return?.EvSvcOrderNo}
                            <button
                                className="outline-none border-none bg-transparent cursor-pointer"
                                onClick={() => toast.dismiss(t.id)}
                            >
                                &#10006;
                            </button>
                        </span>
                    ),
                    { duration: 86400000 } // 24 hours
                );
                return data;
            }

            // Handle error messages
            if (data?.EtEhnErrInfo?.GspnWMsgCode) {
                toast.error(data?.EtEhnErrInfo?.GspnWMsgCode);
            }

            if (Array.isArray(data?.EtErrInfo?.results) && data?.EtErrInfo?.results.length > 0) {
                data.EtErrInfo.results.forEach((error: any) => {
                    toast.error(error.ErrMsg || "An error occurred");
                });
            }

            return data;
        } catch (error: any) {
            console.error("Service order error", error);
            toast.error("Failed to create service order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { addServiceOrder, addServiceOrderLoading };
};

export default useCreateServiceOrder;
