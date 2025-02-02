import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import SearchCustomerRepairshoprScreen from '@/components/screens/bookings/staff/search_customer/rs/page';

export const metadata: Metadata = {
    title: "Bookings | search",
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