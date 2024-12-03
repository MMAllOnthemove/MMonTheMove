
import RepairshoprAssetScreen from '@/components/screens/repairshopr_asset/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Customer assets',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const RepairshoprAsset = () => {
    return (
        <RepairshoprAssetScreen />
    )
}

export default RepairshoprAsset