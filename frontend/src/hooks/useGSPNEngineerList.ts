import axios from "axios";
import { useEffect, useState } from "react";

type TGetEngineerList = {
    AscCode: string;
    AscEngineer: string;
    Capacity?: string;
    EngType: string;
    Engineer: string;
    EngineerName: string;
    GspnId?: string;
    GspnIdStatus?: string;
    HieredDay: string;
    RepairTime: string;
    TelNo: string;
    UniqueId?: string;
    WorkStatus: string;
};
const useIpaasGetEngineerList = () => {
    const ipaasApiUrl = process.env.NEXT_PUBLIC_IPAAS_API_GetEngineerList;
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_IPAAS;
    const company = process.env.NEXT_PUBLIC_COMPANY;
    const ascCode = process.env.NEXT_PUBLIC_ASC_CODE;
    const lang = process.env.NEXT_PUBLIC_LANG;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const pac = process.env.NEXT_PUBLIC_PAC;

    const [gspnEngineerList, setGSPNEngineerList] = useState<
        TGetEngineerList[] | any
    >([]);
    const [gspnEngineerListLoading, setLoading] = useState(false);

    const getGSPNEngineerList = async () => {
        const options = {
            IsCommonHeader: {
                Company: `${company}`,
                AscCode: `${ascCode}`,
                Lang: `${lang}`,
                Country: `${country}`,
                Pac: `${pac}`,
            },
        };
        setLoading(true);
        try {
            const response = await axios.post(`${ipaasApiUrl}`, options, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            const activeEng = [...response?.data?.EtEngrInfo?.results]?.filter(
                (x: any) => x.WorkStatus === "W"
            );
            setGSPNEngineerList(activeEng);
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching GSPN Info api:", error);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getGSPNEngineerList();
    }, []);

    return { gspnEngineerList, gspnEngineerListLoading };
};

export default useIpaasGetEngineerList;
