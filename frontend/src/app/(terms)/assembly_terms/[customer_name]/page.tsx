import TermsAndConditionsScreen from '@/components/screens/terms_and_conditions/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms and conditions',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}
const TermsAndConditions = () => {
    return (
        <TermsAndConditionsScreen />
    )
}

export default TermsAndConditions