import TechniciansScreen from '@/components/screens/departments/hhp/technicians/page'
import React from 'react'
import type { Metadata } from 'next';
import DTVHATechniciansScreen from '@/components/screens/departments/dtv_ha/technicians/page';

export const metadata: Metadata = {
    title: 'DTV/HA technicians tasks',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Technicians = () => {
    return (
        <DTVHATechniciansScreen />
    )
}

export default Technicians
