import axios from "axios";
import { useRouter } from "next/navigation";
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
            if (data?.Return?.EsCommonResult?.EvSvcOrderNo) {
                toast.success(`${data?.Return?.EsCommonResult?.EvSvcOrderNo}`, {
                    duration: 8000,
                });
            } else {
                toast.error(data?.EtEhnErrInfo?.GspnWMsgCode);
            }

            return data;
        } catch (error: any) {
            toast.error(`${error}`);
            console.log("customer create error", error);
        } finally {
            setLoading(false);
        }
    };

    return { addServiceOrder, addServiceOrderLoading };
};

export default useCreateServiceOrder;
