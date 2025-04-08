"use client"
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)

import useUserLoggedIn from '@/hooks/useGetUser'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import SearchGSPNTicket from './gspn/page'
import SearchRepairshoprTicket from './rs/page'
const TookanScreen = () => {

    const { isLoggedIn, loading } = useUserLoggedIn()
    return (
        <main className='tookan-container p-1' >
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <Tabs defaultValue="GSPN" className="">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="GSPN">GSPN</TabsTrigger>
                                <TabsTrigger value="Repairshopr">Repairshopr</TabsTrigger>
                            </TabsList>
                            <TabsContent value="GSPN">
                                <SearchGSPNTicket />
                            </TabsContent>
                            <TabsContent value="Repairshopr">
                                <SearchRepairshoprTicket />
                            </TabsContent>
                        </Tabs>
                    </ >
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </main>
    )

}

export default TookanScreen
