"use client"
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
import { useToast } from "@/hooks/use-toast"
import useLogin from "@/hooks/useLogin"
import { LoginvalidateSchema } from "@/lib/auth_validation_schema"
import { ILoginFormValues } from "@/lib/interfaces"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Link from "next/link"
import { useState } from "react"

export default function LoginScreen() {
    const { login, loading, errors, loginErrorFromBackend } = useLogin();
    const { toast } = useToast();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // console.log(loginErrorFromBackend)
    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { email, password };
        await login(payload);

        if (loginErrorFromBackend) {
            toast({
                variant: "destructive",
                title: `Could not sign you in`,
                description: `${loginErrorFromBackend}`,
            });
        }
    }
    return (


        <form>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Signin to your account</CardTitle>
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
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                        />
                        {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full outline-none" type="submit" onClick={loginUser} disabled={loading}> {loading ? 'Logging in...' : 'Continue'}</Button>
                    <Link className="font-medium text-sm" href="/auth/forgot_password">Forgot password</Link>
                </CardFooter>
            </Card>
        </form>

    )
}
