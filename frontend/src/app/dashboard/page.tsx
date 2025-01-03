import DashboardScreen from '@/components/screens/dashboard/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HHP Dashboard',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Dashboard = () => {
    return (
        <DashboardScreen />
    )
}

export default Dashboard
