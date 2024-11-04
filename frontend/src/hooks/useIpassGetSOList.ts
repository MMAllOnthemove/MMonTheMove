import { TuseIpaasGetSOList } from "@/lib/types";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const useIpaasGetSOList = () => {
    const [gspnSOList, setGSPNSOList] = useState<TuseIpaasGetSOList>([]);
    const [gspnSOListLoading, setGSPNSOListLoading] = useState(true);
    const ipaasApiUrl = process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOLIST;
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_IPASS;
    const company = process.env.NEXT_PUBLIC_COMPANY;
    const ascCode = process.env.NEXT_PUBLIC_ASC_CODE;
    const lang = process.env.NEXT_PUBLIC_LANG;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const pac = process.env.NEXT_PUBLIC_PAC;

    useEffect(() => {
        const getSOInfoAllTookan = async () => {
            const options = {
                IsCommonHeader: {
                    Company: `${company}`,
                    AscCode: `${ascCode}`,
                    Lang: `${lang}`,
                    Country: `${country}`,
                    Pac: `${pac}`,
                },
                IsBasicCond: {
                    AscCode: ascCode,
                    ReqDateFrom: moment().format("YYYYMMDD"),
                    ReqDateTo: moment().format("YYYYMMDD"),
                },
            };

            try {
                setGSPNSOListLoading(true);
                const response = await axios.post(`${ipaasApiUrl}`, options, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${bearerToken}`,
                    },
                });
                if (response?.data?.EtSvcInfo) {
                    const results = [
                        ...response?.data?.EtSvcInfo?.results,
                    ]?.filter((x) => x.SvcProduct === "HHP");
                    setGSPNSOList(results);
                }
            } catch (error) {
                throw error;
            } finally {
                setGSPNSOListLoading(true);
            }
        };
        getSOInfoAllTookan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { gspnSOList, gspnSOListLoading };
};

export default useIpaasGetSOList;
