"use client"
import useUserLoggedIn from '@/hooks/useGetUser'
import useHHPTasks from '@/hooks/useHHPTasks'
import useSocket from '@/hooks/useSocket'
import dynamic from 'next/dynamic'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import HHPDashboardTable from './hhp/technicians/table'

const HHPDashboardCards = dynamic(() =>
    import('./hhp/technicians/cards'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const DashboardScreen = () => {
    const { hhpTasks } = useHHPTasks()
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { isConnected } = useSocket()

    return (
        <>
            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container mx-auto p-1'>
                            <PageTitle title="Dashboard" hasSpan={true} spanText={"HHP"} />
                            <Tabs defaultValue="table_view" className="w-full">
                                <TabsList className="grid w-[400px] grid-cols-2">
                                    <TabsTrigger value="table_view">Table view</TabsTrigger>
                                    <TabsTrigger value="card_view">Card view</TabsTrigger>
                                </TabsList>
                                <TabsContent value="table_view">
                                    <HHPDashboardTable />
                                </TabsContent>
                                <TabsContent value="card_view">
                                    <HHPDashboardCards />
                                </TabsContent>
                            </Tabs>
                        </main>


                    </>
                ) : (<NotLoggedInScreen />)
            }
        </>

    )
}

export default DashboardScreen
