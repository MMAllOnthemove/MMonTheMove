"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useRouter } from 'nextjs-toploader/app';

type TAlertDialogServiceOrder = {
    openModal: boolean;
    setOpenModal: (data: boolean) => void;
    customerEmail: any;
}

const AlertDialogServiceOrder = ({ openModal, setOpenModal, customerEmail }: TAlertDialogServiceOrder) => {
    const router = useRouter()
    const handleCancel = () => {
        if (typeof window !== 'undefined' && window.localStorage) localStorage.clear();
        router.push("/bookings/staff/customers_today")
    }
    const handleContinue = () => {
        // in this instance just redirect to service order page without clearing customer and asset details
        // we will need those for that page
        router.push(`/bookings/staff/create_ticket/gspn/${encodeURIComponent(customerEmail)}`)
    }
    return (
        <AlertDialog open={openModal} onOpenChange={() => setOpenModal(false)} >
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Continue to create service order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {/*  */}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogServiceOrder