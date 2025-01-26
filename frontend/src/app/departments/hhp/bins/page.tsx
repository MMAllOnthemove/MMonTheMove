import BinsScreen from '@/components/screens/departments/hhp/bins/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Engineer bins',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}
const Bins = () => {
    return (
        <BinsScreen />
    )
}

export default Bins