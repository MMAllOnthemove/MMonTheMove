import axios from "axios";

const useUpdateHHPTask = () => {
    const updateHHPTask = async (taskId: string | number, values: any) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/` +
                    taskId,
                values
            );

            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { updateHHPTask };
};

export default useUpdateHHPTask;
