import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const SearchCustomerRepairshoprScreen = dynamic(() => import('@/components/search_customer/rs/page'))
export const metadata: Metadata = {
    title: "Customers | search",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};
const SearchCustomerRepairshopr = () => {
    return (
        <SearchCustomerRepairshoprScreen />
    )
}

export default SearchCustomerRepairshopr