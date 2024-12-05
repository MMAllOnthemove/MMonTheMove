"use client"
import LoadingScreen from '@/components/loading_screen/page'
import NotLoggedInScreen from '@/components/not_logged_in/page'
import CreateCustomerRepairshoprScreen from '@/components/screens/create_customer/rs/page'
import SearchCustomerRepairshoprScreen from '@/components/search_customer/rs/page'
import Sidebar from '@/components/sidebar/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useUserLoggedIn from '@/hooks/useGetUser'

const CustomersRepairshoprScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    return (
        // <CreateCustomerRepairshoprScreen />
        <>

            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>

                        <Sidebar />
                        <div className="container mx-auto p-1">
                            <Tabs defaultValue="existing">
                                <TabsList>
                                    <TabsTrigger value="existing">Existing customer</TabsTrigger>
                                    <TabsTrigger value="new">New customer</TabsTrigger>
                                </TabsList>
                                <TabsContent value="existing">
                                    <SearchCustomerRepairshoprScreen />
                                </TabsContent>
                                <TabsContent value="new">
                                    <CreateCustomerRepairshoprScreen />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CustomersRepairshoprScreen