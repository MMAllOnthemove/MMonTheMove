"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import React, { ChangeEvent } from "react";

import useFetchEngineer from "@/hooks/useFetchEngineers";
import repairshopr_statuses from "@/lib/repairshopr_status";
import warranties from "@/lib/warranties";


type TTasksUpdate = {
    updateTask: boolean;
    assessment_date: string;
    service_order_noProp: string | number | undefined
    reparshoprCommentProp: string
    unit_statusProp: string | undefined
    date_booked: string;
    hhp_tasks_loading: boolean;
    warranty: string;
    serial_number: string;
    engineer: string;
    model: string;
    imei: string;
    job_repair_no: string;
    location: string;
    handleEngineer: (data: any) => void;
    setWarranty: (data: string) => void;
    setServiceOrderProp: (data: ChangeEvent<HTMLInputElement>) => void;
    setRepairshoprCommentProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    setRepairshoprStatusProp: (data: string) => void;
    submitTasksUpdate: (data: React.SyntheticEvent) => void;
    setHHPFilesProp: (data: ChangeEvent<HTMLInputElement>) => void;
    submitHHPFiles: (data: React.SyntheticEvent) => void;
}
const TasksUpdate = ({ handleEngineer, updateTask, engineer, location, job_repair_no, assessment_date, hhp_tasks_loading, model, imei, serial_number, setHHPFilesProp, submitHHPFiles, service_order_noProp, reparshoprCommentProp, unit_statusProp, setServiceOrderProp, setRepairshoprCommentProp, setRepairshoprStatusProp, submitTasksUpdate, date_booked, warranty, setWarranty }: TTasksUpdate) => {
    const { engineersList } = useFetchEngineer()
    const engineerListFomatted = engineersList?.map((user) => ({
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
    }))




    return (
        <form>
            <div className="mb-3">
                <Label htmlFor="serviceOrder">Service order</Label>
                <Input type="text" name="serviceOrder" value={service_order_noProp || ''} onChange={setServiceOrderProp} />
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
            <div className="mb-3">
                <Select name="warranty" value={warranty} onValueChange={setWarranty}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Change warranty" />
                    </SelectTrigger>
                    <SelectContent>
                        {warranties.map((dep) => (
                            <SelectItem key={dep.id} value={`${dep.warranty}`}>{dep.warranty}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-3">
                <Select value={engineer} onValueChange={handleEngineer}>
                    <SelectTrigger >
                        <SelectValue placeholder="Select an engineer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Technicians</SelectLabel>
                            {engineerListFomatted.map((x) => (
                                <SelectItem key={x.label} value={x.value}>
                                    {x.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>


            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>More info</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <ul className="list-decimal list-inside">
                                <li>Booked date and time: <span className="text-gray-600 font-medium">{moment(date_booked).format("YYYY-MM-DD HH:mm:ss")}</span></li>
                                <li>Assessment date and time: <span className="text-gray-600 font-medium">{assessment_date ? assessment_date : null}</span></li>
                                <li>Model: <span className="text-gray-600 font-medium">{model}</span></li>
                                <li>IMEI: <span className="text-gray-600 font-medium">{imei}</span></li>
                                <li>Serial number: <span className="text-gray-600 font-medium">{serial_number}</span></li>
                                <li>Location: <span className="text-gray-600 font-medium">{location}</span></li>
                                <li>Job repair no: <span className="text-gray-600 font-medium">{job_repair_no}</span></li>
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Add attachments</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center">
                            <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={setHHPFilesProp} />
                            <Button className="ml-3" disabled={hhp_tasks_loading} onClick={submitHHPFiles}>{hhp_tasks_loading ? 'Uploading' : 'Attach'}</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button className="w-full outline-none" type="submit" disabled={updateTask} onClick={submitTasksUpdate}>{updateTask ? 'Updating...' : 'Update'}</Button>

        </form >
    )
}

export default TasksUpdate