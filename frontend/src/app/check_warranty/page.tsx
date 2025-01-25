import React from 'react'
import type { Metadata } from 'next';
import CheckWarrantyScreen from '@/components/screens/departments/check_warranty/page';

export const metadata: Metadata = {
    title: 'Check warranty',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const CheckWarranty = () => {
    return (
        <CheckWarrantyScreen />
    )
}

export default CheckWarranty