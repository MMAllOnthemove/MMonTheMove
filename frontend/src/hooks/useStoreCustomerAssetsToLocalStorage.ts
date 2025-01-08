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

<<<<<<< HEAD
    return {
        storeAvailableAssetsLocalStorage,
        isPendingAvailableAssetsLocalStorage,
    };
=======
    return { storeAvailableAssetsLocalStorage };
>>>>>>> cda49505c2bb905ef8a2eac300c6cb24c9f9daee
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

<<<<<<< HEAD
    return {
        storeNewAssetsToLocalStorage,
        isPendingCreatedAssetsToLocalStorage,
    };
=======
    return { storeNewAssetsToLocalStorage };
>>>>>>> cda49505c2bb905ef8a2eac300c6cb24c9f9daee
};
