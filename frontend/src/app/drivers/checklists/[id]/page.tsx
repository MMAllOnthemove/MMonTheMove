import SingleChecklistScreen from '@/components/screens/driver_app/single_checklist/page'

import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update checklist',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const SingleChecklist = () => {
    return (
        <SingleChecklistScreen />
    )
}

export default SingleChecklist