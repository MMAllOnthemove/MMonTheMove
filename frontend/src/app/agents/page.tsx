import AgentsScreen from '@/components/screens/agents/page'
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Booking agents list",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};


const Agents = () => {
    return (
        <AgentsScreen />
    )
}

export default Agents
