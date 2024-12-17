import CreateTicketRepairshoprScreen from '@/components/screens/create_ticket/rs/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create ticket',
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