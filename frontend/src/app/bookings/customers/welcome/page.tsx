

import React from 'react'
import type { Metadata } from 'next';
import WelcomeScreen from '@/components/screens/bookings/customers/welcome_screen/page';

export const metadata: Metadata = {
    title: 'Welcome',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Welcome = () => {
    return (
        <WelcomeScreen />
    )
}

export default Welcome