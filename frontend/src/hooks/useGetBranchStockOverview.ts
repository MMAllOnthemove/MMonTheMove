import axios from "axios";
import { useState } from "react";

type TGetBranchStockOverview = {
    PartsCode: string;
    PartsDesc?: string | null;
    StockQty?: string | null;
    WhStockQty?: string | null;
    AvaStock?: string | null;
}[];

const useIpaasGetBranchStockOverview = () => {
    // const [stockOverviewList, setData] = useState<TGetBranchStockOverview>([]);
    const [stockOverviewListLoading, setLoading] = useState(true);
    const ipaasApiUrl =
        process.env.NEXT_PUBLIC_IPAAS_API_GetBranchStockOverview;
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_IPAAS;
    const company = process.env.NEXT_PUBLIC_COMPANY;
    const ascCode = process.env.NEXT_PUBLIC_ASC_CODE;
    const lang = process.env.NEXT_PUBLIC_LANG;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const pac = process.env.NEXT_PUBLIC_PAC;

    const getBranchStockOverview = async (partNumber: string) => {
        const options = {
            IvCompany: "C720",
            IvLanguage: "EN",
            IvAscAcctno: "1730640",
            IvAscCode: "1730640",
            IvPartsCode: partNumber,
            IsCommonHeader: {
                Company: "C720",
                AscCode: "1730640",
                Lang: "EN",
                Country: "ZA",
                Pac: "999999920180502152340",
            },
        };

        if (!partNumber) return;
        try {
            setLoading(true);
            const { data } = await axios.post(`${ipaasApiUrl}`, options, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            if (data?.EtStockInfo === null) {
                // return `No stock ${data?.Return?.EvRetMsg}`;
                return `No stock data found`;
            } else {
                return `${data?.EtStockInfo?.results[0]?.StockQty} in stock`;
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching GSPN stock", error);
            }
        } finally {
            setLoading(true);
        }
    };

    return { getBranchStockOverview, stockOverviewListLoading };
};

export default useIpaasGetBranchStockOverview;
