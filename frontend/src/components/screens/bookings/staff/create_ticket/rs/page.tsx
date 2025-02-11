"use client"
import dynamic from 'next/dynamic'

import LoadingScreen from '@/components/loading_screen/page'
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'), { ssr: false })

import PageTitle from '@/components/PageTitle/page'
import Sidebar from '@/components/sidebar/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useGetCustomerLocally from '@/hooks/useGetCustomerLocally'
import useUserLoggedIn from '@/hooks/useGetUser'
import { useParams } from 'next/navigation'
import DTVHA from './dtv_ha/page'
import HHP from './hhp/page'

const CreateTicketRepairshoprScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const params = useParams()
    const { customer_email } = params;
    const { singleCustomer, singleCustomerLoading, refetch } = useGetCustomerLocally(
        decodeURIComponent(Array.isArray(customer_email) ? customer_email[0] : customer_email)
    );
    const customerId = singleCustomer[0]?.repairshopr_customer_id
    const customerEmail = singleCustomer[0]?.email

    const customer = {
        customerId: customerId,
        email: customerEmail

    }

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

                            <Tabs defaultValue="hhp">
                                <TabsList>
                                    <TabsTrigger value="hhp">HHP</TabsTrigger>
                                    <TabsTrigger value="dtv/ha">DTV/HA</TabsTrigger>
                                </TabsList>
                                <TabsContent value="hhp">
                                    <HHP customerProps={customer} />
                                </TabsContent>
                                <TabsContent value="dtv/ha">
                                    <p>Coming soon</p>
                                    {/* <DTVHA customerProps={customer} /> */}
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