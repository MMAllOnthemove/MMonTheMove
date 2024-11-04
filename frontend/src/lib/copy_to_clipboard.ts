import toast from "react-hot-toast";

const copyToClipBoard = async (copyMe: string) => {
    try {
        await navigator.clipboard.writeText(copyMe);
        toast.success("Text copied successfully");
    } catch (err) {
        toast.error("Failed to copy");
    }
};
export default copyToClipBoard;
