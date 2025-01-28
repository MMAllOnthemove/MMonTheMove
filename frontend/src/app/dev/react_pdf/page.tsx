import ReactPDFScreen from '@/components/ui/dev/react_pdf';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'React pdf',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const ReactPDF = () => {
    return (
        <ReactPDFScreen />
    )
}

export default ReactPDF