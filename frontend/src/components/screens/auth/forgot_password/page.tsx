"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useForgotPassword from "@/hooks/useForgotPassword";
import Link from 'next/link';
import React, { useState } from 'react';




function ForgotPasswordScreen() {

    const { forgotPassword, loading, errors } = useForgotPassword()
    const [email, setEmail] = useState("")



    const forgotPass = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { email };
        await forgotPassword(payload);

    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <form>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle className="text-center">Forgot password</CardTitle>
                        <CardDescription>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                            />

                            {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}

                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full outline-none" onClick={forgotPass} type="submit" disabled={loading}> {loading ? 'sending otp...' : 'Continue'}</Button>
                        <Link className="font-medium text-sm" href="/auth">Back to login</Link>
                    </CardFooter>
                </Card>
            </form>

        </div>
    )
}

export default ForgotPasswordScreen
