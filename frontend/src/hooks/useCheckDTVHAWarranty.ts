import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

const useCheckWarranty = (modelNumber: string, serialNumber: string) => {
    const [warranty, setWarranty] = useState("");
    const [ticketTypeId, setTicketTypeId] = useState<number | any>();
    const [warrantyCode, setWarrantyCode] = useState<number | any>();
    const [localWarranty, setLocalWarranty] = useState("");

    const [LPDate, setLPDate] = useState("");
    const [PartsDate, setPartsDate] = useState("");

    useEffect(() => {
        const checkWarranty = async () => {
            if (!modelNumber || !serialNumber) return;

            const generateTimeStampForPacCode = moment(
                new Date(
                    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
                )
                    .toISOString()
                    .replace("T", " ")
                    .replace("Z", "")
            ).format("YYMMDDhhmmss");

            const values = {
                IsCommonHeader: {
                    Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
                    AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
                    Lang: `${process.env.NEXT_PUBLIC_LANG}`,
                    Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
                    Pac: `9999999${generateTimeStampForPacCode}`,
                },
                IvModel: `${modelNumber}`,
                IvPurchaseDate: ``,
                IvSerialNo: `${serialNumber}`,
            };

            try {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_IPAAS_API_CHECK_WARRANTY}`,
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPAAS}`,
                        },
                    }
                );

                if (data) {
                    const warranty_type = data?.Return?.EvWtyType;
                    setWarranty(warranty_type);
                    setLPDate(data?.Return?.EvNewLaborWtyDate);
                    setPartsDate(data?.Return?.EvNewPartsWtyDate);
                    if (warranty_type === "LP") {
                        setWarrantyCode("75130");
                        setTicketTypeId("21877");
                        setLocalWarranty("IW");
                    } else {
                        setWarrantyCode("75131");
                        setTicketTypeId("21878");
                        setLocalWarranty("OOW");
                    }
                } else {
                    toast.error(data?.Return?.EvRetMsg);
                }
            } catch (error) {
                if (process.env.NODE_ENV !== "production")
                    console.error("check warranty error", error);
            }
        };

        checkWarranty();
    }, [modelNumber, serialNumber]);

    return {
        warranty,
        warrantyCode,
        ticketTypeId,
        localWarranty,
        LPDate,
        PartsDate,
    };
};

export default useCheckWarranty;
