import ChecklistsScreen from '@/components/screens/driver_app/checklists/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vehicle checklists',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Checklists = () => {
    return (
        <ChecklistsScreen />
    )
}

export default Checklists