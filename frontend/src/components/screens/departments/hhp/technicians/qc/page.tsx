"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { datetimestamp } from '@/lib/date_formats';
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import qc_reasons from "@/lib/hhp_quality_control_reasons";
type TQC = {
    qcUpdateLoading: boolean;
    qc_fail_reasonProp: string
    qc_completeProp: string
    qc_extratext: string
    setQCCompleteProp: (data: string) => void;
    setQCCompleteDateProp: (data: string) => void;
    // setQCFailProp: (data: string) => void;
    // setQCFailDateProp: (data: string) => void;
    setUnitCompleteProp: (data: boolean) => void;
    setUnitCompleteDateProp: (data: string) => void;
    setQCFailReasonProp: (value: string) => void;
    setQCExtraText: (value: string) => void;

    submitQC: (data: React.SyntheticEvent) => void;
}
const QC = ({ qc_extratext, setQCExtraText, qcUpdateLoading, setUnitCompleteProp, setUnitCompleteDateProp, qc_fail_reasonProp, qc_completeProp, setQCCompleteProp, setQCCompleteDateProp, setQCFailReasonProp, submitQC }: TQC) => {

    const [isChecked, setIsChecked] = useState(false);

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
            <div className="flex gap-3 items-center my-3">
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
            </div>
            
            <Select value={qc_fail_reasonProp} onValueChange={setQCFailReasonProp}>
                <SelectTrigger className="w-full" name="qc_comment">
                    <SelectValue placeholder="Select a fault" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>QC Faults</SelectLabel>
                        {qc_reasons?.map((x) => (
                            <SelectItem key={x.id} value={x.name}>
                                {x.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <label className="flex items-center gap-2 text-sm font-medium leading-none my-2">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(prev => !prev)}
                    className="accent-blue-600"
                />
                <span>Add extra text?</span>
            </label>
            {isChecked && (
                <Textarea name="qc_extratext" className='my-3' placeholder="Accessories and other text" value={qc_extratext} onChange={(e) => setQCExtraText(e.target.value)} />)}

            <Button data-qc='qc_submit' className="w-full outline-none" type="submit" onClick={submitQC} disabled={qcUpdateLoading || !qc_completeProp}>{qcUpdateLoading ? 'Updating...' : 'Update Quality control'}</Button>
        </form>

    )
}

export default QC