"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/useLogin";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function LoginScreen() {
    const { login, loading, errors } = useLogin();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { email, password };
        await login(payload);

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
                        <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 outline-none shadow-none"
                                type={passwordShown ? "text" : "password"}
                            />

                            <Button
                                type="button"
                                onClick={togglePassword}
                                data-testid="toggle-password"
                                className="bg-transparent border-none outline-none shadow-none hover:bg-transparent"
                            >
                                <span>
                                    {!passwordShown ? (
                                        <EyeIcon className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <EyeSlashIcon className="w-6 h-6 text-gray-600" />
                                    )}
                                </span>
                            </Button>
                        </div>
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
