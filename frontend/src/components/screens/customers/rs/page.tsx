"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useUserLoggedIn from '@/hooks/useGetUser'
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const CreateCustomerRepairshoprScreen = dynamic(() =>
    import('@/components/screens/create_customer/rs/page')
)
const SearchCustomerRepairshoprScreen = dynamic(() =>
    import('@/components/search_customer/rs/page')
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)

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