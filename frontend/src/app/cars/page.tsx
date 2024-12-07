import React from 'react'
import type { Metadata } from 'next';
import CarsScreen from '@/components/screens/cars/page';

export const metadata: Metadata = {
    title: 'Cars',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Cars = () => {
    return (
        <CarsScreen />
    )
}

export default Cars