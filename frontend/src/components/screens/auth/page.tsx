"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import axios from "axios"
import dynamic from 'next/dynamic'
import { useEffect } from "react"

const LoginScreen = dynamic(() =>
    import('./login/page'), { ssr: false }
)
const SignupScreen = dynamic(() =>
    import('./signup/page'), { ssr: false }
)

export default function AuthScreen() {
    // const { user, isLoggedIn } = useUserLoggedIn()

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/logout`,
                    {
                        withCredentials: true,
                    }
                );
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error("Error logging out:", error);
                }
            }
        };
        logoutUser()
    }, [])
    return (
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className=" rounded border active:border-emerald-500 focus:border-emerald-500">Login</TabsTrigger>
                    <TabsTrigger value="signup" className=" rounded border active:border-emerald-500 focus:border-emerald-500">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginScreen />
                </TabsContent>
                <TabsContent value="signup">
                    <SignupScreen />
                </TabsContent>
            </Tabs>
        </div>
    )
}
