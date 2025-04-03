import axios from "axios";

type TQCToTable = {
    ticket_number: string;
    qc_complete: string;
    qc_comment: string;
    created_at: string;
    created_by: string | undefined;
};
const useQCToTable = () => {
    const addQCToTable = async (values: TQCToTable) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/qc_table`,
                values,
                {
                    withCredentials: true,
                }
            );
        } catch (error: any) {
            if (process.env.NODE_ENV !== "production") console.error(error);
        }
    };

    return { addQCToTable };
};

export default useQCToTable;
