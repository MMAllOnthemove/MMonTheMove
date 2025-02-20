import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const useCheckWarranty = (
    modelNumber: string,
    serialNumber: string,
    imei: string | number
) => {
    const [warranty, setWarranty] = useState("");
    const [ticketTypeId, setTicketTypeId] = useState<number | any>();
    const [warrantyCode, setWarrantyCode] = useState<number | any>();
    const [localWarranty, setLocalWarranty] = useState("");
    const [selectedWarranty, setSelectedWarranty] = useState("");
    const [LPDate, setLPDate] = useState("");
    const [PartsDate, setPartsDate] = useState("");
    useEffect(() => {
        const checkWarranty = async () => {
            if (!modelNumber || !serialNumber || !imei) return;

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
                    if (data?.Return?.EvWtyType === "LP") {
                        setTicketTypeId("21877");
                        setWarrantyCode("75130");
                        setLocalWarranty("IW");
                    } else if (data?.Return?.EvWtyType === "OW") {
                        setTicketTypeId("21878");
                        setWarrantyCode("69477");
                        setLocalWarranty("OOW");
                    }
                }
            } catch (error) {
                if (process.env.NODE_ENV !== "production")
                    console.error("check warranty error", error);
            }
        };

        checkWarranty();
    }, [imei, modelNumber, serialNumber]);

    const handleWarrantyChange = (event: any) => {
        setLocalWarranty(event);
        // Update other state variables based on the selected warranty
        if (event === "IW") {
            setTicketTypeId("21877");
            setWarrantyCode("75130");
            setLocalWarranty("IW");
        } else if (event === "OOW") {
            setTicketTypeId("21878");
            setWarrantyCode("69477");
            setLocalWarranty("OOW");
        }
    };

    return {
        warranty,
        warrantyCode,
        ticketTypeId,
        localWarranty,
        selectedWarranty,
        handleWarrantyChange,
        LPDate,
        PartsDate,
    };
};

export default useCheckWarranty;
