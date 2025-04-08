"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

const WelcomeScreen = () => {
    const router = useRouter();

    const goTo = (location: string) => {
        router.push(location);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800 pt-10 sm:pt-16">
            <div className="flex flex-col items-center gap-2 mx-auto shadow-sm p-4 rounded-lg">
                <h2 className="text-xl font-regular text-gray-100 mb-2">MM ALL Electronics</h2>
                <Image
                    src="/samsung_logo.png"
                    alt="Samsung Logo"
                    width={300}
                    height={300}
                />
                <p className="text-gray-200 mt-2">Call: (011) 326 - 8337</p>


                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <Button
                        onClick={() => goTo("/bookings/customers/create_customer")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                        aria-label="Yes, this is my first time"
                    >
                        This is my first time
                    </Button>
                    <Button
                        onClick={() => goTo("/bookings/customers/search_customer")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                        aria-label="No, I’ve been here before"
                    >
                        I’ve been here before
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
