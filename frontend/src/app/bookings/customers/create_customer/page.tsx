import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CreateCustomerRepairshoprScreen = dynamic(() => import('@/components/screens/create_customer/rs/page'))

export const metadata: Metadata = {
    title: "Customers | create",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const CreateCustomer = () => {
    return (
        <CreateCustomerRepairshoprScreen />
    )
}

export default CreateCustomer