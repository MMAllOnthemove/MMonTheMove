import DunoworxRobtronicScreen from '@/components/screens/bookings/staff/create_ticket/dunoworx_robtronics/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dunoworx/Robtronics',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const DunoworxRobtronics = () => {
    return (
        <DunoworxRobtronicScreen />
    )
}

export default DunoworxRobtronics