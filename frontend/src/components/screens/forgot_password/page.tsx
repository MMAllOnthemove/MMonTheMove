"use client"
import { ForgotPasswordvalidateSchema } from '@/lib/auth_validation_schema';
import { IForgotPasswordFormValues } from '@/lib/interfaces';
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import Link from 'next/link';


type TForgotPasswordScreenError = {
    response: {
        data: {
            message: {
                message: string
            }
        }
    }
}

function ForgotPasswordScreen() {

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const resetPassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { email }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/forgot_password`, payload);
            console.log("reset password response", response)
        } catch (error: any) {
            setEmailError(error?.response?.data?.message)
        }
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


                            <p className="text-sm text-red-500 font-medium">{emailError}</p>


                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full outline-none" type="submit" onClick={resetPassword}>Continue</Button>
                        <Link className="font-medium text-sm" href="/auth">Back to login</Link>
                    </CardFooter>
                </Card>
            </form>

        </div>
    )
}

export default ForgotPasswordScreen
