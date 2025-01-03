import CreateOtpScreen from '@/components/screens/create_otp/page'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'OTP',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const CreateOtp = () => {
    return (
        <CreateOtpScreen />
    )
}

export default CreateOtp