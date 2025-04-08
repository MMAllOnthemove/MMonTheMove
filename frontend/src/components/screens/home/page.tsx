import useUserLoggedIn from "@/hooks/useGetUser";
import dynamic from 'next/dynamic';
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'), { ssr: false })
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'), { ssr: false })
const Sidebar = dynamic(() => import('@/components/sidebar/page'), { ssr: false })
// import nodemailer from 'nodemailer';



const HomeScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()

    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <div className="h-screen">
                        <Sidebar />
                    </div>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    );
}
export default HomeScreen
