"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const NotLoggedInScreen = () => {
    const router = useRouter()
    return (
        <div className='h-screen flex justify-center items-center flex-col gap-3'>
            <p className='text-center font-medium text-slate-950'>You are not logged in</p>
            <Button onClick={() => router.push("/auth")} className='bg-gray-950 outline-none text-gray-50'>Login</Button>

        </div>
    )
}

export default NotLoggedInScreen
