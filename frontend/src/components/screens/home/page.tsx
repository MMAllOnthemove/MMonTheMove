
import LoadingScreen from "@/components/loading_screen/page";
import NotLoggedInScreen from "@/components/not_logged_in/page";
import Sidebar from "@/components/sidebar/page";
import useUserLoggedIn from "@/hooks/useGetUser";
// import nodemailer from 'nodemailer';



export default function HomeScreen() {
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
