"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { datetimestamp } from '@/lib/date_formats';
import React, { ChangeEvent } from "react";

type TQC = {
    qc_fail_reasonProp: string
    qc_completeProp: string
    setQCCompleteProp: (data: string) => void;
    setQCCompleteDateProp: (data: string) => void;
    setQCFailReasonProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    submitQC: (data: React.SyntheticEvent) => void;
}
const QC = ({ qc_fail_reasonProp, qc_completeProp, setQCCompleteProp, setQCCompleteDateProp, setQCFailReasonProp, submitQC }: TQC) => {



    const handleQCcheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQCCompleteProp(value);
        if (value === 'Pass') {
            setQCCompleteDateProp(datetimestamp);
        }
    };

    // console.log('qc values', qc_fail_reasonProp, qc_completeProp)


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
            {
                qc_completeProp === 'Fail' ? <div>
                    <Textarea className='mb-3' placeholder="Reason for QC failing." value={qc_fail_reasonProp} onChange={setQCFailReasonProp} />
                </div> : null
            }
            <Button className="w-full outline-none" type="submit" onClick={submitQC}> Update</Button>
        </form>

    )
}

export default QC