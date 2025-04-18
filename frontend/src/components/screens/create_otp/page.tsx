"use client"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAddOtp from '@/hooks/useOtp'
import useUserLoggedIn from '@/hooks/useGetUser'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import useOtp from '@/hooks/useOtp'
import useSocket from '@/hooks/useSocket'
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const CreateOtpScreen = () => {
    const { isConnected } = useSocket()
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addOTP, otpAddLoading } = useOtp()
    const [otp_code, setOtpCode] = useState('')

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const created_by = user?.email;
        const payload = { created_by, otp_code }
        await addOTP(payload)
        setOtpCode("")
    }
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='tookan-container p-1'>
                            <Card className='w-full border-none md:max-w-[700px] max-w-[550px] shadow-none md:border md:shadow'>
                                <CardHeader>
                                    <CardTitle className="text-center">Create otp</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="overflow-auto">
                                        <div className="p-[1rem]">
                                            <form onSubmit={submit}>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="mb-1">
                                                        <Label htmlFor='otp_code'>OTP <small>5 characters</small></Label>
                                                        <Input type="text" value={otp_code} maxLength={5} onChange={(e) => setOtpCode(e.target.value)} name='otp_code' id='otp_code' />

                                                    </div>
                                                </div>

                                                <Button type="submit" className='w-full my-4' disabled={otpAddLoading}>
                                                    {otpAddLoading ? "Creating otp.." : ' Create otp'}
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </main>


                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CreateOtpScreen