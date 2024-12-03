"use client"
import LoadingScreen from '@/components/loading_screen/page'
import NotLoggedInScreen from '@/components/not_logged_in/page'
import PageTitle from '@/components/PageTitle/page'
import Sidebar from '@/components/sidebar/page'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useUserLoggedIn from '@/hooks/useGetUser'
import { useRouter } from 'next/navigation'
import DTVHA from './dtv_ha/page'
import HHP from './hhp/page'

const CreateTicketRepairshoprScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    // console.log("user", user)
    const router = useRouter()
    return (

        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="ticket" hasSpan={true} spanText={"Create"} />

                            <Button onClick={() => router.push("/customers/rs")} type="button" className='flex mx-auto'>Go to customer section</Button>
                            <Tabs defaultValue="hhp">
                                <TabsList>
                                    <TabsTrigger value="hhp">HHP</TabsTrigger>
                                    <TabsTrigger value="dtv/ha">DTV/HA</TabsTrigger>
                                </TabsList>
                                <TabsContent value="hhp">
                                    <HHP />
                                </TabsContent>
                                <TabsContent value="dtv/ha">
                                    <DTVHA />
                                </TabsContent>
                            </Tabs>

                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CreateTicketRepairshoprScreen