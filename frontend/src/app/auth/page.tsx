
import AuthScreen from '@/components/screens/auth/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auth',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}


const Auth = () => {

    return (
        <AuthScreen />
    )
}
export default Auth
