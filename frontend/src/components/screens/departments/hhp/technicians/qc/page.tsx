"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { datetimestamp } from '@/lib/date_formats';
import React, { ChangeEvent } from "react";
type TQC = {
    qcUpdateLoading: boolean;
    qc_fail_reasonProp: string
    qc_completeProp: string
    setQCCompleteProp: (data: string) => void;
    setQCCompleteDateProp: (data: string) => void;
    setUnitCompleteProp: (data: boolean) => void;
    setUnitCompleteDateProp: (data: string) => void;
    setQCFailReasonProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    submitQC: (data: React.SyntheticEvent) => void;
}
const QC = ({ qcUpdateLoading, setUnitCompleteProp, setUnitCompleteDateProp, qc_fail_reasonProp, qc_completeProp, setQCCompleteProp, setQCCompleteDateProp, setQCFailReasonProp, submitQC }: TQC) => {



    const handleQCcheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQCCompleteProp(value);
        if (value === 'Pass') {
            setQCCompleteDateProp(datetimestamp);
            setUnitCompleteDateProp(datetimestamp);
            setUnitCompleteProp(true);
        }
    };


    return (
        <form>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">QC complete?</label>
            <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                <input
                    type="radio"
                    name="qc_complete"
                    checked={qc_completeProp === 'Fail'}
                    value="Fail"
                    onChange={handleQCcheck}
                /> Fail
            </div>
            <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                <input
                    type="radio"
                    name="qc_complete"
                    checked={qc_completeProp === 'Pass'}
                    value="Pass"
                    onChange={handleQCcheck}
                /> Pass
            </div>
            <Textarea className='mb-3' placeholder="Reason for QC failing/passing." value={qc_fail_reasonProp} onChange={setQCFailReasonProp} />



            <Button className="w-full outline-none" type="submit" onClick={submitQC} disabled={qcUpdateLoading}>{qcUpdateLoading ? 'Updating...' : 'Update Quality control'}</Button>
        </form>

    )
}

export default QC