import ClaimsScreen from '@/components/screens/departments/claims/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Claims',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const Claims = () => {
    return (
        <ClaimsScreen />
    )
}

export default Claims
