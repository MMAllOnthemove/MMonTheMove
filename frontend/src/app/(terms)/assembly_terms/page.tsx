import AssemblyTermScreen from '@/components/screens/assembly_terms/page'
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
function AssemblyTerm() {
    return (
        <AssemblyTermScreen />
    )
}

export default AssemblyTerm
