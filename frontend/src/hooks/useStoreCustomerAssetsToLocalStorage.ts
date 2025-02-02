import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";
export const useStoreAvailableAssetsLocalStorage = () => {
    const router = useRouter();
    const storeAvailableAssetsLocalStorage = (
        key: string,
        value: object,
        redirectPath: string
    ) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
            toast.success("Assets created, Continue");
            router.push(redirectPath);
        }
    };

    return {
        storeAvailableAssetsLocalStorage,
    };
};
export const useStoreCreatedAssetsToLocalStorage = () => {
    const router = useRouter();
    const storeNewAssetsToLocalStorage = (
        key: string,
        value: object,
        redirectPath: string
    ) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
            router.push(redirectPath);
        }
    };

    return {
        storeNewAssetsToLocalStorage,
    };
};
