
import LoadingScreen from "@/components/loading_screen/page";
import NotLoggedInScreen from "@/components/not_logged_in/page";
import Sidebar from "@/components/sidebar/page";
import useUserLoggedIn from "@/hooks/useGetUser";
import useLogoutUser from "@/hooks/useLogout";
// import nodemailer from 'nodemailer';

import { useRouter } from "next/navigation";


export default function HomeScreen() {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { logoutUser, logoutLoading, error } = useLogoutUser()
    const router = useRouter();


    // const sendMail = () => {
    //     const transporter = nodemailer.createTransport({
    //         host: "mail.mmallonthemove.co.za",
    //         port: 465,
    //         secure: true, // true for port 465, false for other ports
    //         auth: {
    //             user: "maddison53@ethereal.email",
    //             pass: "jn7jnAPss4f63QBp6D",
    //         },
    //     });

    //     const mailOptions = {
    //         from: 'test@gmail.com',
    //         to: 'katleho_m@allelectronics.co.za',
    //         subject: 'Hello from Nodemailer!',
    //         text: 'This is a test email using Nodemailer and ES6.',
    //     };
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             console.log('Error occurred:', error);
    //         } else {
    //             console.log('Email sent:', info.response);
    //         }
    //     });

    // }

    const logout = () => {
        logoutUser()
        // router.refresh();
    }
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <div className="h-screen">
                        <Sidebar />
                        {/* <p>You are logged in {user?.email} </p>
                        <Button onClick={logout} disabled={logoutLoading} className='bg-gray-950 outline-none text-gray-50'>{logoutLoading ? 'Logging out...' : 'Logout'}</Button> */}

                    </div>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    );
}
