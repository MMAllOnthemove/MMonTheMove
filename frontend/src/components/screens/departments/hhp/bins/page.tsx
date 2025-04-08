"use client"
import useUserLoggedIn from '@/hooks/useGetUser'
import dynamic from 'next/dynamic'
import AdminsBin from "./admin"
import TechniciansBin from "./technicians"
const Sidebar = dynamic(() => import('@/components/sidebar/page'))
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'))
const PageTitle = dynamic(() => import('@/components/PageTitle/page'))
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'))

const BinsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()

    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        {/* <Sidebar /> */}
                        <main className='container p-1'>

                            {
                                user?.user_role === "admin" || user?.user_role === "manager" ? <AdminsBin user={user} isLoggedIn={isLoggedIn} loading={loading} /> : <TechniciansBin user={user} isLoggedIn={isLoggedIn} loading={loading} />
                            }


                        </main>

                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }

        </>
    )
}

export default BinsScreen