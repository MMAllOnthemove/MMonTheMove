import axios from "axios";

const useIpaasSymptomCodes = () => {
    const ipaasApiUrl = process.env.NEXT_PUBLIC_IPAAS_API_GetCustomerSymptom;
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_IPAAS;
    const company = process.env.NEXT_PUBLIC_COMPANY;
    const ascCode = process.env.NEXT_PUBLIC_ASC_CODE;
    const lang = process.env.NEXT_PUBLIC_LANG;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const pac = process.env.NEXT_PUBLIC_PAC;

    const getCustomerCodes = async (modelNumber: string) => {
        const options = {
            IvModel: modelNumber,
            IsCommonHeader: {
                Company: `${company}`,
                AscCode: `${ascCode}`,
                Lang: `${lang}`,
                Country: `${country}`,
                Pac: `${pac}`,
            },
        };

        try {
            const response = await axios.post(`${ipaasApiUrl}`, options, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            return response.data?.EtSymptomData?.results;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching GSPN customer codes api:", error);
            }
        }
    };

    return { getCustomerCodes };
};

export default useIpaasSymptomCodes;
