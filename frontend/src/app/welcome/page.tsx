
import WelcomeScreen from '@/components/screens/welcome_screen/page'
import React from 'react'
import type { Metadata } from 'next';

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