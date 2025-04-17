import CreateCustomerRepairshoprScreen from '@/components/screens/bookings/customers/create_customer/rs/page';
import { Metadata } from 'next';


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