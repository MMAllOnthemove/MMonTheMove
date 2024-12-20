"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { datetimestamp } from '@/lib/date_formats';
import { TTaskParts } from '@/lib/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckedState } from '@radix-ui/react-checkbox';
import React from 'react';
type TPartsHHPUpdate = {
    parts_orderedProp: CheckedState | undefined
    parts_pendingProp: CheckedState | undefined
    parts_issuedProp: CheckedState | undefined
    parts_requestedProp: CheckedState | undefined
    compensation: CheckedState | undefined | any | any
    search_part: string;
    setSearchPart: (data: string) => void;
    part_desc: string;
    setPartDesc: (data: string) => void;
    part_quantity: number | undefined;
    setPartQuantity: (data: number | undefined) => void;
    setPartsOrderedProp: (data: CheckedState | undefined) => void;
    setPartsOrderedDateProp: (data: string) => void;
    setPartsPendingProp: (data: CheckedState | undefined) => void;
    setPartsPendingDateProp: (data: string) => void;
    setPartsIssuedProp: (data: CheckedState | undefined) => void;
    setPartsRequestedProp: (data: CheckedState | undefined) => void;

    setCompensation: (data: CheckedState | undefined | any | null) => void;
    setPartsRequestedDateProp: (data: string) => void;
    setPartsIssuedDateProp: (data: string) => void;
    addPartLoading: boolean;
    addPartOnRepairshoprLoading: boolean;
    submitPartsUpdateLoading: boolean;
    addPartOnRepairshopr: (data: React.SyntheticEvent) => void;
    addPart: (data: React.SyntheticEvent) => void;
    submitPartsUpdate: (data: React.SyntheticEvent) => void;
    part_data: TTaskParts[];
    deletePartLoading: boolean;
    // 3 arguments so we know which part was deleted
    handleDelete: (data: string, part_name: string, part_desc: string) => void;
    errors: {
        part_name?: string;
        part_desc?: string;
        part_quantity?: string;
    }
}
const Parts = ({ parts_orderedProp, parts_pendingProp, deletePartLoading, parts_issuedProp, part_data, handleDelete, parts_requestedProp, setPartsRequestedProp, setPartsRequestedDateProp, setPartsOrderedProp, setPartsOrderedDateProp, setPartsPendingProp, setPartsPendingDateProp, setPartsIssuedProp, setPartsIssuedDateProp, search_part, setSearchPart, part_desc, setPartDesc, part_quantity, setPartQuantity, addPartLoading, addPart, submitPartsUpdateLoading, addPartOnRepairshoprLoading, addPartOnRepairshopr, submitPartsUpdate, setCompensation, compensation, errors }: TPartsHHPUpdate) => {
    const handlePartsOrdered = (e: React.SyntheticEvent | any) => {
        if (!parts_orderedProp) {
            setPartsOrderedProp(e);
            setPartsOrderedDateProp(datetimestamp)
        }
    }
    const handlePartsPending = (e: React.SyntheticEvent | any) => {
        if (!parts_pendingProp) {
            setPartsPendingProp(e);
            setPartsPendingDateProp(datetimestamp)
        }
    }
    const handlePartsIssued = (e: React.SyntheticEvent | any) => {
        if (!parts_issuedProp) {
            setPartsIssuedProp(e);
            setPartsIssuedDateProp(datetimestamp)
        }
    }
    const handlePartsRequested = (e: React.SyntheticEvent | any) => {
        if (!parts_requestedProp) {
            setPartsRequestedProp(e);
            setPartsRequestedDateProp(datetimestamp)
        }
    }
    const handleCompensation = (e: React.SyntheticEvent | any) => {
        if (!compensation) {
            setCompensation(e);
        }
    }
    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Search and add part</AccordionTrigger>
                    <AccordionContent>
                        <div>

                            <Input type="text" placeholder="Part name" name="part_name" value={search_part} className={`${errors.part_name ? 'border border-red-500' : 'border outline-none shadow-none'}`} onChange={(e) => setSearchPart(e.target.value)} />
                            {/* {errors.part_name && <p className="text-sm text-red-500 font-medium">{errors.part_name}</p>} */}


                        </div>
                        <div className="grid items-center grid-cols-[3fr_1fr] gap-2 my-3">

                            <div>
                                <Input type="text" className="text-xs" placeholder="Part desc" name="part_desc" disabled value={part_desc || ''} onChange={(e) => setPartDesc(e.target.value)} />
                                {errors.part_desc && <p className="text-sm text-red-500 font-medium">{errors.part_desc}</p>}

                            </div>
                            <div>
                                <Input type="number" placeholder="Quantity" name="part_quantity" size={1} minLength={1} maxLength={1} value={part_quantity || 0} onChange={(e) => setPartQuantity(parseInt(e.target.value, 10))} />
                                {errors.part_quantity && <p className="text-sm text-red-500 font-medium">{errors.part_quantity}</p>}

                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                                <Checkbox id="compensation" checked={compensation}
                                    onCheckedChange={handleCompensation} />
                                <label
                                    htmlFor="compensation"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Compensation?
                                </label>
                            </div>

                        </div>
                        <Button className="w-full outline-none bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985]" type="button" onClick={addPart} disabled={addPartLoading}>{addPartLoading ? 'Adding...' : 'Add part'} </Button>

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Added parts</AccordionTrigger>
                    <AccordionContent>

                        <div>
                            {part_data?.length > 0 ? part_data?.map((item) => (
                                <div key={item.id}>
                                    <p className="flex items-center justify-between border-b border-grey-50" >
                                        ({item.part_name}) / <span className="text-ellipsis overflow-hidden whitespace-nowrap">{item?.part_desc} /</span> ({item?.part_quantity}) <button type="button" disabled={deletePartLoading} onClick={() => handleDelete(item.id, item?.part_name, item?.part_desc)}>{deletePartLoading ? '...' : <XMarkIcon className="h-4 w-4" />}</button>
                                    </p>
                                </div>
                            )) : "No parts for this task"}
                            {part_data?.length > 0 ? (
                                <div className="flex items-center justify-between">
                                    <Button type="button" className="outline-none mt-3 text-xs bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985]" onClick={addPartOnRepairshopr} disabled={addPartOnRepairshoprLoading}>{addPartOnRepairshoprLoading ? 'Loading...' : 'Comment these parts'}</Button>
                                    <p className="text-sm font-medium text-gray-800">Total: {part_data?.length}</p>
                                </div>
                            ) : null}
                        </div>

                        <div>
                            <h3>Select status</h3>
                            <p className="text-sm font-medium">Ensure you select part status when adding parts</p>
                            <div className="mb-3 pt-4">

                                <div className="flex items-center space-x-2 mb-3">
                                    <Checkbox id="parts_pending" checked={parts_pendingProp}
                                        onCheckedChange={handlePartsPending} />
                                    <label
                                        htmlFor="parts_pending"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Parts pending?
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Checkbox id="parts_ordered" checked={parts_requestedProp}
                                        onCheckedChange={handlePartsRequested} />
                                    <label
                                        htmlFor="parts_ordered"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Parts requested 1st approval?
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Checkbox id="parts_ordered" checked={parts_orderedProp}
                                        onCheckedChange={handlePartsOrdered} />
                                    <label
                                        htmlFor="parts_ordered"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Parts ordered?
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                                <Checkbox id="parts_issued" checked={parts_issuedProp}
                                    onCheckedChange={handlePartsIssued} />
                                <label
                                    htmlFor="parts_issued"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Parts issued?
                                </label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>


            </Accordion>

            <Button className="w-full outline-none" type="button" onClick={submitPartsUpdate} disabled={submitPartsUpdateLoading}>{submitPartsUpdateLoading ? 'Loading...' : 'Update'}</Button>

        </div >
    )
}

export default Parts