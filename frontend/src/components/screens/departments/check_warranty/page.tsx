"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'nextjs-toploader/app';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCheckWarranty from '@/hooks/useCheckDTVHAWarranty';
import useUserLoggedIn from '@/hooks/useGetUser';
import dynamic from 'next/dynamic';
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page')
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)
const CheckWarrantyScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const [model, setModel] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const { warranty, warrantyCode, ticketTypeId, localWarranty } = useCheckWarranty(model, serialNumber)

    return (


        <>

            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <div className="flex justify-center items-center h-screen bg-orange-100">
                            <Card className="max-w-md w-full">

                                <CardHeader>
                                    <CardTitle className="text-center text-xl font-bold">
                                        Check warranty
                                    </CardTitle>
                                    <CardDescription className="text-center text-gray-600">
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-4">

                                        <div>
                                            <Label htmlFor="model">Model</Label>
                                            <Input
                                                value={model || ''}
                                                onChange={(e) => setModel(e.target.value)}
                                                autoComplete='false'
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="serialNumber">Serial number</Label>
                                            <Input
                                                value={serialNumber || ''}
                                                onChange={(e) => setSerialNumber(e.target.value)}
                                                autoComplete='false'
                                                type="text"
                                            />
                                        </div>
                                        <p className="text-center">The unit is <span className="font-semibold text-sky-800">{warranty}</span></p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </>

                ) : <NotLoggedInScreen />
            }
        </>
    )
}

export default CheckWarrantyScreen