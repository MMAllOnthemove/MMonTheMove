"use client"
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { useRouter } from 'nextjs-toploader/app';


const NotLoggedInScreen = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/auth");
    };

    return (
        <div className="h-screen flex justify-center items-center flex-col gap-3">

            <>
                <p className="text-center font-medium text-slate-950">
                    You are not logged in
                </p>
                <Button
                    onClick={handleLoginClick}
                    className="bg-gray-950 outline-none text-gray-50"
                >
                    Login
                </Button>
            </>
        </div>
    );
};

export default NotLoggedInScreen;