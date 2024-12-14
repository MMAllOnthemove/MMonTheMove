import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const useCheckWarranty = (
    modelNumber: string,
    serialNumber: string,
    imei: string | number
) => {
    const [warranty, setWarranty] = useState("");
    const [ticketTypeId, setTicketTypeId] = useState<number>();
    const [warrantyCode, setWarrantyCode] = useState<number>();
    const [localWarranty, setLocalWarranty] = useState("");

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
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
                        },
                    }
                );

                if (data) {
                    const warranty_type = data?.Return?.EvWtyType;
                    setWarranty(warranty_type);

                    if (warranty_type === "LP") {
                        setWarrantyCode(69476);
                        setTicketTypeId(21877);
                        setLocalWarranty("IW");
                    } else {
                        setWarrantyCode(69477);
                        setTicketTypeId(21878);
                        setLocalWarranty("OOW");
                    }
                }
            } catch (error) {
                console.log("check warranty error", error);
            }
        };

        checkWarranty();
    }, [imei, modelNumber, serialNumber]);

    return { warranty, warrantyCode, ticketTypeId, localWarranty };
};

export default useCheckWarranty;
