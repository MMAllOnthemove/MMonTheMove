import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CreateCustomerStaffScreen = dynamic(() => import('@/components/screens/bookings/staff/create_customer/page'))

export const metadata: Metadata = {
    title: "Staff | Bookings",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const CreateCustomer = () => {
    return (
        <CreateCustomerStaffScreen />
    )
}

export default CreateCustomer