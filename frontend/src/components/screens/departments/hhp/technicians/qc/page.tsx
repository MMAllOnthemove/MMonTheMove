"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { datetimestamp } from '@/lib/date_formats';
import React, { ChangeEvent } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
type TQC = {
    qc_fail_reasonProp: string
    qc_completeProp: string
    qc_FilesLoadingProp: boolean
    setQCCompleteProp: (data: string) => void;
    setQCCompleteDateProp: (data: string) => void;
    setUnitCompleteProp: (data: boolean) => void;
    setUnitCompleteDateProp: (data: string) => void;
    setQCFailReasonProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    setQCFilesProp: (data: ChangeEvent<HTMLInputElement>) => void;
    submitQCFiles: (data: React.SyntheticEvent) => void;
    submitQC: (data: React.SyntheticEvent) => void;
}
const QC = ({ setUnitCompleteProp, setUnitCompleteDateProp, qc_fail_reasonProp, qc_completeProp, setQCCompleteProp, setQCCompleteDateProp, setQCFailReasonProp, qc_FilesLoadingProp, setQCFilesProp, submitQCFiles, submitQC }: TQC) => {



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

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Attachments</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center">
                            <Input type="file" multiple className="my-3" onChange={setQCFilesProp} />
                            <Button className="ml-3" disabled={qc_FilesLoadingProp} onClick={submitQCFiles}>{qc_FilesLoadingProp ? 'Uploading' : 'Attach'}</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button className="w-full outline-none" type="submit" onClick={submitQC}> Update</Button>
        </form>

    )
}

export default QC