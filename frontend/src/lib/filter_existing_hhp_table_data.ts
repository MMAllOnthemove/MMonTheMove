import { TInternalGSPNData } from "./types";

type extenalData = {
    SvcOrderNo: string;
};
const filterData = (
    apiData: extenalData[],
    internalData: TInternalGSPNData[]
): extenalData[] => {
    const internalIds = new Set(
        internalData?.map((record) => record?.service_order_no)
    );
    return apiData?.filter((record) => !internalIds?.has(record?.SvcOrderNo));
};
export default filterData;
