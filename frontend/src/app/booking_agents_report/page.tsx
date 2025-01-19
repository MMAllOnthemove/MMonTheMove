import BookingAgentsReportScreen from '@/components/screens/booking_agents_report/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Booking agents',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const BookingAgentsReport = () => {
    return (
        <BookingAgentsReportScreen />
    )
}

export default BookingAgentsReport
