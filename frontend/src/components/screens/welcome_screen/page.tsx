"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTransition } from 'react'

const WelcomeScreen = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    const goTo = (location: string) => {
        startTransition(() => {
            router.push(location)
        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-orange-100">
            <Card className="max-w-md w-full">
                
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">
                        Is this your first visit to us?
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Let us know if you&apos;re visiting for the first time or if you&apos;re already a customer.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <Button
                            onClick={() => goTo("/create_customer")}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                            aria-label="Yes, this is my first time"
                        >
                            Yes, this is my first time
                        </Button>
                        <Button
                            onClick={() => goTo("/search_customer")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                            aria-label="No, I’ve been here before"
                        >
                            No, I’ve been here before
                        </Button>
                    </div>
                    {isPending && <p className="text-gray-800 font-semibold">Loading...</p>}
                </CardContent>
            </Card>
        </div>
    );
};

export default WelcomeScreen;
