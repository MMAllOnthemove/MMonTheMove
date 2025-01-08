import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTransition } from "react";
export const useStoreAvailableAssetsLocalStorage = () => {
    const router = useRouter();
    const [isPendingAvailableAssetsLocalStorage, startTransition] =
        useTransition();
    const storeAvailableAssetsLocalStorage = (
        key: string,
        value: object,
        redirectPath: string
    ) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
            toast.success("Assets created, Continue");
            startTransition(() => {
                router.push(redirectPath);
            });
        }
    };

    return { storeAvailableAssetsLocalStorage };
};
export const useStoreCreatedAssetsToLocalStorage = () => {
    const router = useRouter();
    const [isPendingCreatedAssetsToLocalStorage, startTransition] =
        useTransition();
    const storeNewAssetsToLocalStorage = (
        key: string,
        value: object,
        redirectPath: string
    ) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
            startTransition(() => {
                router.push(redirectPath);
            });
        }
    };

    return { storeNewAssetsToLocalStorage };
};
