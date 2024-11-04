import EngineersScreen from '@/components/screens/engineers/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Technicians',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Engineers = () => {
    return (
        <EngineersScreen />
    )
}

export default Engineers
