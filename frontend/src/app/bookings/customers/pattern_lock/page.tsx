
import PatternLockScreen from '@/components/screens/bookings/customers/pattern_lock/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pattern lock',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}
const PatternLock = () => {
    return (
        <PatternLockScreen />
    )
}

export default PatternLock