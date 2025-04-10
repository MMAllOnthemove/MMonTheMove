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
import { Textarea } from "@/components/ui/textarea";
import useFetchEngineer from "@/hooks/useFetchEngineers";
import useUserLoggedIn from "@/hooks/useGetUser";
import repairshopr_statuses from "@/lib/repairshopr_status";
import repairshopr_statuses_techs from "@/lib/tech_rs_statuses";
import { cn } from "@/lib/utils";
import { type_21877, type_21878 } from "@/lib/warranty_maps";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { ChangeEvent } from "react";


type TTasksUpdate = {
    updateTask: boolean;
    assessment_date?: string;
    service_order_noProp: string | number | undefined
    reparshoprCommentProp: string
    unit_statusProp: string | undefined
    date_booked: string | undefined | any;
    additional_info: string;
    hhp_tasks_loading: boolean;
    serial_number: string | undefined | any;
    engineer: string | undefined | any;
    model: string | undefined | any;
    imei: string | undefined | any;
    ticket_type_id: string | undefined | any;
    rs_warranty: string | undefined | any;
    job_repair_no: string;
    engineerCombobox: boolean;
    location: string;
    setEngineer: (data: any) => void;
    setEngineerUserId: (data: any) => void;
    setEngineerCombobox: (data: boolean) => void;
    setServiceOrderProp: (data: ChangeEvent<HTMLInputElement>) => void;
    setRepairshoprCommentProp: (data: ChangeEvent<HTMLTextAreaElement>) => void;
    setRepairshoprStatusProp: (e: string) => void;
    submitTasksUpdate: (data: React.SyntheticEvent) => void;
    handleTicketRSWarranty: (data: React.ChangeEvent<HTMLSelectElement>) => void;
    setHHPFilesProp: (data: ChangeEvent<HTMLInputElement>) => void;
    submitHHPFiles: (data: React.SyntheticEvent) => void;
    device_location: string | null;
    setDeviceLocation: (data: any) => void;
    add_job_repair_no: string | null;
    setAddJobRepairNo: (data: any) => void;

}
const TasksUpdate = ({ rs_warranty, handleTicketRSWarranty, setEngineer, setEngineerUserId, ticket_type_id, updateTask, engineer, engineerCombobox, setEngineerCombobox, location, job_repair_no, assessment_date, additional_info, hhp_tasks_loading, model, imei, serial_number, setHHPFilesProp, submitHHPFiles, service_order_noProp, reparshoprCommentProp, unit_statusProp, setServiceOrderProp, setRepairshoprCommentProp, setRepairshoprStatusProp, submitTasksUpdate, date_booked, device_location, setDeviceLocation, add_job_repair_no, setAddJobRepairNo }: TTasksUpdate) => {
    const { engineersList } = useFetchEngineer()
    const engineerListFomatted = engineersList?.map((user) => ({
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
    }))
    const { user, isLoggedIn, loading } = useUserLoggedIn()
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
                <div className="relative">
                    {isLoggedIn && user?.user_role === "admin" || user?.user_role === "manager" ?
                        <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" name="status" value={unit_statusProp} onChange={(e) => setRepairshoprStatusProp(e.target.value)}>
                            <option disabled value="">
                                Select status
                            </option>
                            {repairshopr_statuses.map((dep) => (
                                <option key={dep.id} value={`${dep._status}`}>
                                    {dep._status}
                                </option>
                            ))}
                        </select> :
                        <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" name="status" value={unit_statusProp} onChange={(e) => setRepairshoprStatusProp(e.target.value)}>
                            <option disabled value="">
                                Select status
                            </option>
                            {repairshopr_statuses_techs.map((dep) => (
                                <option key={dep.id} value={`${dep._status}`}>
                                    {dep._status}
                                </option>
                            ))}
                        </select>}
                    <span
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="relative my-3">
                {/* so we can change warranty this on rs */}
                {
                    ticket_type_id === "21877" ?
                        <select name='rs_warranty' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={rs_warranty || ''}
                            onChange={handleTicketRSWarranty}>
                            <option value="">Select warranty</option>
                            {
                                type_21877?.map((x: any) => (

                                    <option key={`${x?.id}`} value={`${x?.code}`}>{x?.warranty}</option>
                                ))
                            }
                        </select> : <select name='rs_warranty' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={rs_warranty || ''}
                            onChange={handleTicketRSWarranty}>
                            <option value="">Select warranty</option>
                            {
                                type_21878?.map((x: any) => (

                                    <option key={`${x?.id}`} value={`${x?.code}`}>{x?.warranty}</option>
                                ))
                            }
                        </select>
                }


                <span
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </div>
            <div className="mb-3">
                <Popover open={engineerCombobox} onOpenChange={setEngineerCombobox}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={engineerCombobox}
                            className="w-full justify-between"
                        >
                            {engineer
                                ? engineerListFomatted?.find((framework) => framework.value === engineer)?.label
                                : "Select technician..."}
                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search technician..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>Technician not found.</CommandEmpty>
                                <CommandGroup>
                                    {engineerListFomatted?.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setEngineer(currentValue === engineer ? "" : currentValue)
                                                setEngineerUserId(framework?.repairshopr_id); // Store the corresponding repairshopr ID
                                                setEngineerCombobox(false)
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
            <div>
                <div>
                    <Label htmlFor="device_location">Add location</Label>
                    <Input type="text" name="device_location" value={device_location || ''} onChange={(e) => setDeviceLocation(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="add_job_repair_no">Add job repair no</Label>
                    <Input type="text" name="add_job_repair_no" value={add_job_repair_no || ''} onChange={(e) => setAddJobRepairNo(e.target.value)} />
                </div>

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
                                <li>Special requirement: <span className="text-gray-600 font-medium">{additional_info}</span></li>
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