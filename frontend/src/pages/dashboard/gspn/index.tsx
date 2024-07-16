import React from 'react'
import Dashboard from '@/components/DashboardTables/gspn/Dashboard'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Tabs from '@/components/Tabs'
import TabPane from '@/components/Tabs/TabPane'
import Head from "next/head";
import dynamic from "next/dynamic";
// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
function DashboardGSPN() {
    return (
        <>
            <Head>
                <title>Dashboard GSPN</title>
                <meta name="robots" content="noindex, nofollow"></meta>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="space-between-navbar-and-content">
                <div className="container mx-auto ">

                    <Dashboard />
                </div>
            </main>

        </>
    )
}

export default DashboardGSPN
