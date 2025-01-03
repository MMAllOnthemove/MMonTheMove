import StoresScreen from '@/components/screens/stores/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stores',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Stores = () => {
    return (
        <StoresScreen />
    )
}

export default Stores
