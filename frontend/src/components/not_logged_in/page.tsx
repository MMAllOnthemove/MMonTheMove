"use client"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const LoadingScreen = dynamic(() => import("../loading_screen/page"))



const NotLoggedInScreen = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = () => {
        setIsLoading(true);
        router.push("/auth");
    };

    return (
        <div className="h-screen flex justify-center items-center flex-col gap-3">
            {isLoading ? (
                <LoadingScreen />
            ) : (
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
            )}
        </div>
    );
};

export default NotLoggedInScreen;