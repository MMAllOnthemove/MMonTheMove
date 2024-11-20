"use client"
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react'
import { CheckedState } from '@radix-ui/react-checkbox';
import { datetimestamp } from '@/lib/date_formats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TTaskParts } from '@/lib/types';
type TPartsHHPUpdate = {
    parts_orderedProp: CheckedState | undefined
    parts_pendingProp: CheckedState | undefined
    parts_issuedProp: CheckedState | undefined
    parts_requestedProp: CheckedState | undefined
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
    setPartsRequestedDateProp: (data: string) => void;
    setPartsIssuedDateProp: (data: string) => void;
    addPartLoading: boolean;
    submitPartsUpdateLoading: boolean;
    addPart: (data: React.SyntheticEvent) => void;
    submitPartsUpdate: (data: React.SyntheticEvent) => void;
    part_data: TTaskParts[];
    deletePartLoading: boolean;
    handleDelete: (data: string) => void;
    errors: {
        part_name?: string;
        part_desc?: string;
        part_quantity?: string;
    }
}
const Parts = ({ parts_orderedProp, parts_pendingProp, deletePartLoading, parts_issuedProp, part_data, handleDelete, parts_requestedProp, setPartsRequestedProp, setPartsRequestedDateProp, setPartsOrderedProp, setPartsOrderedDateProp, setPartsPendingProp, setPartsPendingDateProp, setPartsIssuedProp, setPartsIssuedDateProp, search_part, setSearchPart, part_desc, setPartDesc, part_quantity, setPartQuantity, addPartLoading, addPart, submitPartsUpdateLoading, submitPartsUpdate, errors }: TPartsHHPUpdate) => {
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
                                <Input type="text" className="text-xs" placeholder="Part desc" name="part_desc" disabled value={part_desc} onChange={(e) => setPartDesc(e.target.value)} />
                                {errors.part_desc && <p className="text-sm text-red-500 font-medium">{errors.part_desc}</p>}

                            </div>
                            <div>
                                <Input type="number" placeholder="Quantity" name="part_quantity" size={1} minLength={1} maxLength={1} value={part_quantity} onChange={(e) => setPartQuantity(parseInt(e.target.value, 10))} />
                                {errors.part_quantity && <p className="text-sm text-red-500 font-medium">{errors.part_quantity}</p>}

                            </div>

                        </div>
                        <Button className="w-full outline-none bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985]" type="button" onClick={addPart} disabled={addPartLoading}>{addPartLoading ? 'Adding...' : 'Add part'} </Button>

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Added parts</AccordionTrigger>
                    <AccordionContent>

                        {part_data && [...part_data]?.map((item) => (
                            <p className="flex items-center justify-between border-b border-grey-50" key={item.id}>
                                {item.part_name} <button type="button" disabled={deletePartLoading} onClick={() => handleDelete(item.id)}>{deletePartLoading ? '...' : <XMarkIcon className="h-4 w-4" />}</button>
                            </p>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Status</AccordionTrigger>
                    <AccordionContent>
                        <div className="mb-3">

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
                                    Parts requested?
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button className="w-full outline-none" type="button" onClick={submitPartsUpdate} disabled={submitPartsUpdateLoading}>{submitPartsUpdateLoading ? 'Loading...' : 'Update'}</Button>

        </div>
    )
}

export default Parts