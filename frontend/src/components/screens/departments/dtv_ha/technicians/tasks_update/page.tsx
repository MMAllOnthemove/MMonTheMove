"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { ChangeEvent } from "react";

import useFetchEngineer from "@/hooks/useFetchEngineers";
import repairshopr_statuses from "@/lib/repairshopr_status";
import { cn } from "@/lib/utils";
import warranties from "@/lib/warranties";


type TTasksUpdate = {
    assessment_date: string;
    service_order_noProp: string | number | undefined
    reparshoprCommentProp: string
    unit_statusProp: string | undefined
    date_booked: string;
    dtv_tasks_loading: boolean;
    engineer: string;
    warranty: string;
    model: string;
    job_repair_no: string;
    location: string;
    serial_number: string;
    engineersComboBox: boolean;
    setEngineer: (data: string) => void;
    setWarranty: (data: string) => void;
    setEngineerComboBox: (data: boolean) => void;
    setUserId: (data: number | undefined) => void;
    setServiceOrderProp: (data: ChangeEvent<HTMLInputElement>) => void;
    setRepairshoprCommentProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    setRepairshoprStatusProp: (data: string) => void;
    submitTasksUpdate: (data: React.SyntheticEvent) => void;
    setDTVHAFilesProp: (data: ChangeEvent<HTMLInputElement>) => void;
    submitDTVHAFiles: (data: React.SyntheticEvent) => void;
}
const TasksUpdate = ({ location, job_repair_no, assessment_date, dtv_tasks_loading, model, serial_number, setDTVHAFilesProp, submitDTVHAFiles, service_order_noProp, reparshoprCommentProp, unit_statusProp, setServiceOrderProp, setRepairshoprCommentProp, setRepairshoprStatusProp, submitTasksUpdate, date_booked, engineer, engineersComboBox, setEngineerComboBox, setUserId, setEngineer, warranty, setWarranty }: TTasksUpdate) => {
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
                <Popover open={engineersComboBox} onOpenChange={setEngineerComboBox}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={engineersComboBox}
                            className="w-full justify-between"
                        >
                            {engineer
                                ? engineerListFomatted?.find((framework) => framework.value === engineer)?.label
                                : "Select engineer..."}
                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search engineer..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No engineer found.</CommandEmpty>
                                <CommandGroup>
                                    {engineerListFomatted?.map((framework) => (
                                        <CommandItem

                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setEngineer(currentValue === engineer ? "" : currentValue)
                                                setUserId(framework?.repairshopr_id); // Store the corresponding repairshopr ID
                                                setEngineerComboBox(false)
                                            }}
                                        >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    engineer === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

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
                            <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={setDTVHAFilesProp} />
                            <Button className="ml-3" disabled={dtv_tasks_loading} onClick={submitDTVHAFiles}>{dtv_tasks_loading ? 'Uploading' : 'Attach'}</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button className="w-full outline-none" type="submit" onClick={submitTasksUpdate}> Update</Button>

        </form >
    )
}

export default TasksUpdate