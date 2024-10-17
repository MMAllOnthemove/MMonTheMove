import LoginScreen from "@/components/screens/login/page"
import SignupScreen from "@/components/screens/signup/page"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auth',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}


export default function Auth() {
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
