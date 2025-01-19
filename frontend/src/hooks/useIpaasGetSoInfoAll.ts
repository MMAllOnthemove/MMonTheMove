import axios from "axios";
import { useState } from "react";

const useIpaasGetSOInfoAll = () => {
    const ipaasApiUrl = process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL;
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_IPAAS;
    const company = process.env.NEXT_PUBLIC_COMPANY;
    const ascCode = process.env.NEXT_PUBLIC_ASC_CODE;
    const lang = process.env.NEXT_PUBLIC_LANG;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const pac = process.env.NEXT_PUBLIC_PAC;

    const [loadingData, setLoading] = useState(false);

    const getSOInfoAllTookan = async (serviceOrder: string | number) => {
        const options = {
            IvSvcOrderNo: serviceOrder,
            IsCommonHeader: {
                Company: `${company}`,
                AscCode: `${ascCode}`,
                Lang: `${lang}`,
                Country: `${country}`,
                Pac: `${pac}`,
            },
        };
        if (!serviceOrder) return;
        try {
            setLoading(true);
            const response = await axios.post(`${ipaasApiUrl}`, options, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching GSPN Info api:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return { getSOInfoAllTookan, loadingData };
};

export default useIpaasGetSOInfoAll;
