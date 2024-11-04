import TechniciansScreen from '@/components/screens/departments/hhp/technicians/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HHP Technicians tasks',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Technicians = () => {
    return (
        <TechniciansScreen />
    )
}

export default Technicians
