"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginScreen from "./login/page"
import SignupScreen from "./signup/page"
import { useEffect } from "react"
import useUserLoggedIn from "@/hooks/useGetUser"
import useLogoutUser from "@/hooks/useLogout"


export default function AuthScreen() {
    const { user, isLoggedIn } = useUserLoggedIn()
    const { logoutUser } = useLogoutUser()

    useEffect(() => {
        const ifUserHasSessionOnThisPageClearIt = async () => {
            if (user && isLoggedIn) {
                logoutUser()
            }
        }
        ifUserHasSessionOnThisPageClearIt()
    }, [user, isLoggedIn, logoutUser])
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
