
import CustomersRepairshoprScreen from '@/components/screens/customers/rs/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Customers',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const CreateCustomerRepairshopr = () => {

    return (
        <CustomersRepairshoprScreen />

    )
}

export default CreateCustomerRepairshopr