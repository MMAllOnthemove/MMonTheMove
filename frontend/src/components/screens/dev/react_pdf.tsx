"use client"
import useAssemblyTerms from '@/hooks/useGetAssemblyTerm';
import useSocket from '@/hooks/useSocket';
import { datetimestamp } from '@/lib/date_formats';
import jsPDF from 'jspdf';

// import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
type Rule = {
    id: string;
    unique_id: string;
    term?: string;
    bold?: boolean | null;
    created_at?: string;
    checked?: boolean;
}


const ReactPDFScreen = () => {

    return (
        <>

            terte
        </>
    )

}

export default ReactPDFScreen