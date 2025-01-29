import React from 'react'
import type { Metadata } from 'next';
import TermsAndConditionsScreen from '@/components/screens/bookings/customers/terms_and_conditions/page';

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