import BookFromSOScreen from '@/components/screens/departments/hhp/book_from_so/page'
import React from 'react'
import { Metadata } from 'next'


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