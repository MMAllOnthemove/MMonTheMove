import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CustomersScreen = dynamic(() => import('@/components/screens/customers/page'))

export const metadata: Metadata = {
    title: "Customers | MM ALL ELECTRONICS",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const CreateCustomer = () => {
    return (
        <CustomersScreen />
    )
}

export default CreateCustomer