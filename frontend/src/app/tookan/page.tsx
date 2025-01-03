import TookanScreen from '@/components/screens/tookan/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tookan',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Tookan = () => {
    return (
        <TookanScreen />
    )
}

export default Tookan
