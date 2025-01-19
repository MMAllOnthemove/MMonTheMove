import DriversScreen from '@/components/screens/driver_app/drivers/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Drivers',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Drivers = () => {
    return (
        <DriversScreen />
    )
}

export default Drivers