
import React from 'react'
import type { Metadata } from 'next';
import AssemblyTermScreen from '@/components/screens/bookings/customers/assembly_terms/page';

export const metadata: Metadata = {
    title: 'Terms and conditions',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}
function AssemblyTerm() {
    return (
        <AssemblyTermScreen />
    )
}

export default AssemblyTerm
