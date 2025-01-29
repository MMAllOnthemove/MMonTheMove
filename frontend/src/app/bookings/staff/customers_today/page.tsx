import React from 'react'
import { Metadata } from 'next';
import CustomerVistListScreen from '@/components/screens/bookings/staff/customer_vist_list/page';


export const metadata: Metadata = {
    title: "Customers list",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const Customers = () => {
    return (
        <CustomerVistListScreen />
    )
}

export default Customers