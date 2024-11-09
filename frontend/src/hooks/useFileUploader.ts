import axios from "axios";
import useRepairshoprFile from "./useAddRepairshoprFile";
interface FileUploaderResponse {
    fileUrls: string[];
}
const useFileUploader = () => {
    const { addRepairTicketFile } = useRepairshoprFile();
    const uploadFiles = async (files: FileList, url: string) => {
        try {
            const formData = new FormData();
            Array.from(files).forEach((file: File) => {
                formData.append("files", file);
            });

            const { data } = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            return data as FileUploaderResponse;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error uploading files:", error);
            }
        }
    };

    return { uploadFiles };
};

export default useFileUploader;
