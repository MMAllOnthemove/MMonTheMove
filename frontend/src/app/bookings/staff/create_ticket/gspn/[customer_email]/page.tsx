import GSPNScreen from '@/components/screens/bookings/staff/create_ticket/gspn/page';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Create service order",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const CreateServiceOrder = () => {
    return (
        <GSPNScreen />
    )
}

export default CreateServiceOrder