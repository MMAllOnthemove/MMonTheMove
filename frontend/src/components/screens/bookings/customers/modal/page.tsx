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
import { capitalizeText } from "@/lib/capitalize";
import { useRouter } from 'nextjs-toploader/app';

type TAlertDialogPassword = {
    openModal: boolean;
    setOpenModal: (data: boolean) => void;
    firstName: string, lastName: string
}

const AlertDialogPassword = ({ openModal, setOpenModal, firstName, lastName }: TAlertDialogPassword) => {
    const router = useRouter()

    const handlePattern = () => {
        // store customer somewhere since it is needed in assembly 
        // pattern lock has no way of storing customer
        if (typeof window !== "undefined") {
            window.localStorage.setItem('customer', JSON.stringify(`${capitalizeText(firstName)} ${capitalizeText(lastName)}`));
        }
        // in this instance just redirect to service order page without clearing customer and asset details
        // we will need those for that page
        router.push(`/bookings/customers/pattern_lock`)
    }
    const handleContinue = () => {
        // in this instance just redirect to service order page without clearing customer and asset details
        // we will need those for that page
        const fullname = `${capitalizeText(firstName)} ${capitalizeText(lastName)}`
        router.push(`/assembly_terms/${encodeURIComponent(fullname)}`)
    }
    return (
        <AlertDialog open={openModal} onOpenChange={() => setOpenModal(false)} >
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Which one of these does your device use?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {/*  */}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleContinue}>None</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePattern}>Pattern</AlertDialogAction>
                    {/* <AlertDialogAction onClick={handleContinue}>Password</AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogPassword