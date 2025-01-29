import React from 'react'
import type { Metadata } from 'next';
import CreateTicketRepairshoprScreen from '@/components/screens/bookings/staff/create_ticket/rs/page';

export const metadata: Metadata = {
    title: 'Create repairshopr ticket',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const CreateTicketRepairshopr = () => {
    return (
        <CreateTicketRepairshoprScreen />
    )
}

export default CreateTicketRepairshopr