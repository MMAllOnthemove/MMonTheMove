import axios from "axios";
import { useState } from "react";

const useIpaasSOPartsInfo = () => {
    const ipaasApiUrl = process.env.NEXT_PUBLIC_IPAAS_API_SEARCH_PARTS;
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_IPAAS;
    const company = process.env.NEXT_PUBLIC_COMPANY;
    const ascCode = process.env.NEXT_PUBLIC_ASC_CODE;
    const lang = process.env.NEXT_PUBLIC_LANG;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const pac = process.env.NEXT_PUBLIC_PAC;

    const [loadingPartInfo, setLoading] = useState(false);

    const getSOPartsInfo = async (partNumber: string) => {
        const options = {
            IsCommonHeader: {
                Company: `${company}`,
                AscCode: `${ascCode}`,
                Lang: `${lang}`,
                Country: `${country}`,
                Pac: `${pac}`,
            },
            IvPartsNo: partNumber,
        };
        if (!partNumber) return;
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

    return { getSOPartsInfo, loadingPartInfo };
};

export default useIpaasSOPartsInfo;
