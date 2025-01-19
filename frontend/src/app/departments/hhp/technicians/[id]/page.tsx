import ViewHHPTaskScreen from '@/components/screens/departments/hhp/technicians/view_task/page'
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "HHP single task",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};

const ViewHHPTask = () => {
    return (
        <ViewHHPTaskScreen />
    )
}

export default ViewHHPTask