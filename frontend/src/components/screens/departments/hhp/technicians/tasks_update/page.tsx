"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { datetimestamp } from '@/lib/date_formats';
import React, { ChangeEvent } from "react";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import { Checkbox } from "@/components/ui/checkbox";
import repairshopr_statuses from "@/lib/repairshopr_status";
import { CheckedState } from '@radix-ui/react-checkbox';
type TTasksUpdate = {
    units_assessedProp: CheckedState | undefined
    service_order_noProp: string | number | undefined
    reparshoprCommentProp: string
    unit_statusProp: string | undefined
    setUnitAssessedProp: (data: CheckedState | string | undefined) => void;
    setAssessmentDateProp: (data: string) => void;
    setServiceOrderProp: (data: ChangeEvent<HTMLInputElement>) => void;
    setRepairshoprCommentProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    setRepairshoprStatusProp: (data: string | number) => void;
    submitTasksUpdate: (data: React.SyntheticEvent) => void;

}
const TasksUpdate = ({ units_assessedProp, service_order_noProp, reparshoprCommentProp, unit_statusProp, setUnitAssessedProp, setAssessmentDateProp, setServiceOrderProp, setRepairshoprCommentProp, setRepairshoprStatusProp, submitTasksUpdate }: TTasksUpdate) => {

    const handleUnitsAssessed = (e: React.SyntheticEvent | any) => {
        if (!units_assessedProp) {
            setUnitAssessedProp(e);
            setAssessmentDateProp(datetimestamp)
        }
    }


  
    return (
        <form>
            <div className="mb-3">
                <Label htmlFor="serviceOrder">Service order</Label>
                <Input type="text" name="serviceOrder" value={service_order_noProp} onChange={setServiceOrderProp} />
            </div>
            <div className="mb-3">
                <Label htmlFor="reparshoprComment">Repairshopr note</Label>
                <Textarea value={reparshoprCommentProp} name="reparshoprComment" onChange={setRepairshoprCommentProp} />
            </div>
            <div className="mb-3">
                <Select name="status" value={unit_statusProp} onValueChange={setRepairshoprStatusProp}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {repairshopr_statuses.map((dep) => (
                            <SelectItem key={dep.id} value={`${dep._status}`}>{dep._status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2 mb-3">
                <Checkbox id="units_assessed" checked={units_assessedProp}
                    onCheckedChange={handleUnitsAssessed} />
                <label
                    htmlFor="units_assessed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Unit assessed?
                </label>
            </div>
            <Button className="w-full outline-none" type="submit" onClick={submitTasksUpdate}> Update</Button>

        </form >
    )
}

export default TasksUpdate