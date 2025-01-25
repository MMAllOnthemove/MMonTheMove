import React from 'react'
import type { Metadata } from 'next';
import FilesToTicketScreen from '@/components/screens/files_ticket/page';

export const metadata: Metadata = {
    title: 'Attachments',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const FilesToTicket = () => {
    return (
        <FilesToTicketScreen />
    )
}

export default FilesToTicket