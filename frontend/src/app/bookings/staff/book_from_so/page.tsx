import React from 'react'
import { Metadata } from 'next'
import BookFromSOScreen from '@/components/screens/bookings/staff/book_from_so/page';


export const metadata: Metadata = {
    title: "Book from SO | create",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};
const BookFromSO = () => {
    return (
        <BookFromSOScreen />
    )
}

export default BookFromSO