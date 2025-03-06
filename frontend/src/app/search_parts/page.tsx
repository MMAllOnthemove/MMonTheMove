import React from 'react'
import type { Metadata } from 'next';
import SearchPartsScreen from '@/components/screens/search_parts/page';

export const metadata: Metadata = {
    title: 'Search parts',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const SearchParts = () => {
    return (
        <SearchPartsScreen />
    )
}

export default SearchParts