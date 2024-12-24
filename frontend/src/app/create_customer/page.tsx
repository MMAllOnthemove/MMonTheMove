import { Metadata } from 'next'
import dynamic from 'next/dynamic'
const CreateCustomerScreen = dynamic(() =>
    import('@/components/screens/create_customer/page')
)


export const metadata: Metadata = {
    title: "Customers | create or search",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const CreateCustomer = () => {
    return (
        <CreateCustomerScreen />
    )
}

export default CreateCustomer