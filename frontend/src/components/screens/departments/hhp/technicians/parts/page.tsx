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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { datetimestamp } from '@/lib/date_formats';
import repairshopr_part_statuses from "@/lib/parts_status";
import { TTaskParts } from '@/lib/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckedState } from '@radix-ui/react-checkbox';
import React, { useEffect, useState } from 'react';
type TPartsHHPUpdate = {
    parts_orderedProp: CheckedState | undefined
    parts_issuedProp: CheckedState | undefined
    parts_requestedProp: CheckedState | undefined
    compensation: CheckedState | undefined | any | any
    search_part: string;
    parts_order_id: string | null | undefined;
    setPartsOrderId: (data: string) => void;
    setSearchPart: (data: string) => void;
    partsExtraText: string;
    setPartsExtraText: (data: string) => void;
    partsIssuedText: string;
    setIssuedExtraText: (data: string) => void;
    part_desc: string;
    setPartDesc: (data: string) => void;
    part_quantity: number | undefined;
    setPartQuantity: (data: number | undefined) => void;
    setPartsOrderedProp: (data: CheckedState | undefined) => void;
    setPartsOrderedDateProp: (data: string) => void;
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
    submitPartOrderIdLoading: boolean;
    submitPartOrderId: (data: React.SyntheticEvent) => void;
    submitPartsUpdate: (data: React.SyntheticEvent) => void;
    serial_number: string | undefined;
    model: string | undefined;
    imei: string | undefined;
    part_data: TTaskParts[];
    deletePartLoading: boolean;
    issuedPartsLoading: boolean;
    // 3 arguments so we know which part was deleted
    handleDelete: (data: string, part_name: string, part_desc: string) => void;
    errors: {
        part_name?: string;
        part_desc?: string;
        part_quantity?: string;
    }
    stored_parts_order_id: string | null | undefined;
    part_status: string;
    setPartStatus: (e: string) => void;
    in_stock: string | undefined;
    onSelectionChange: (selectedParts: string[]) => void;
    submitPartsIssued: (data: any) => void;
}
const Parts = ({ partsIssuedText, setIssuedExtraText, submitPartsIssued, issuedPartsLoading, onSelectionChange, in_stock, partsExtraText, setPartsExtraText, deletePartLoading, parts_order_id, setPartsOrderId, stored_parts_order_id, submitPartOrderIdLoading, submitPartOrderId, part_data, handleDelete, setPartsRequestedProp, setPartsRequestedDateProp, setPartsOrderedProp, setPartsOrderedDateProp, setPartsIssuedProp, setPartsIssuedDateProp, search_part, setSearchPart, part_desc, setPartDesc, part_quantity, setPartQuantity, addPartLoading, addPart, submitPartsUpdateLoading, addPartOnRepairshoprLoading, addPartOnRepairshopr, submitPartsUpdate, setCompensation, compensation, model, imei, serial_number, errors, part_status, setPartStatus }: TPartsHHPUpdate) => {
    const [selectedParts, setSelectedParts] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState(false);


    useEffect(() => {
        onSelectionChange(selectedParts); // Notify parent of changes
    }, [selectedParts, onSelectionChange]);

    // Toggle single part selection
    // Toggle part selection
    const handlePartChange = (partId: string, partName: string) => {
        setSelectedParts((prevSelectedParts) =>
            prevSelectedParts.some((p) => p.id === partId)
                ? prevSelectedParts.filter((p) => p.id !== partId)
                : [...prevSelectedParts, { id: partId, part_name: partName, seal_number: "", part_issued: true }]
        );
    };

    // Handle Select All
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedParts([]); // Deselect all
        } else {
            setSelectedParts(part_data?.map((part) => ({ id: part.id, part_name: part.part_name, seal_number: "", part_issued: true }))); // Select all
        }
        setSelectAll(!selectAll);
    };

    // Update seal number
    const handleSealNumberChange = (partId: string, seal_number: string) => {
        setSelectedParts((prevSelectedParts) =>
            prevSelectedParts.map((p) =>
                p.id === partId ? { ...p, seal_number } : p
            )
        );
    };




    const handlePartStatus = (e: React.SyntheticEvent | any) => {
        setPartStatus(e.target.value)
        if (e.target.value === 'Parts to be ordered') {
            setPartsOrderedProp(true);
            setPartsOrderedDateProp(datetimestamp)
        }
        if (e.target.value === 'Parts Issued') {
            setPartsIssuedProp(true);
            setPartsIssuedDateProp(datetimestamp)
        }
        if (e.target.value === 'Parts Request 1st Approval') {
            setPartsRequestedProp(true);
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
                        </div>
                        <div className="flex items-center justify-between mb-3 w-full">
                            <div className="flex items-center space-x-2 ">
                                <Checkbox id="compensation" checked={compensation}
                                    onCheckedChange={handleCompensation} />
                                <label
                                    htmlFor="compensation"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Compensation?
                                </label>
                            </div>
                            <p className="text-sm text-gray-500">{in_stock}</p>


                        </div>
                        <Button className="w-full mt-2" type="button" onClick={addPart} disabled={addPartLoading}>{addPartLoading ? 'Adding...' : 'Add part'} </Button>

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Parts used for unit</AccordionTrigger>
                    <AccordionContent>
                        <div className="my-3">
                            {part_data?.length > 0 && (
                                <div className="my-3">
                                    <Label htmlFor="partsExtraText">Add comment to go with these parts</Label>
                                    <Textarea
                                        placeholder="e.g. I need these parts..."
                                        name="partsExtraText"
                                        value={partsExtraText}
                                        onChange={(e) => setPartsExtraText(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            {part_data?.length > 0 ? part_data?.map((item: any) => (
                                <div key={item.id}>
                                    <p className="flex items-center justify-between border-b border-grey-50 text-xs leading-3" >
                                        ({item.part_name}) / <span className="text-ellipsis overflow-hidden whitespace-nowrap">{item?.part_desc} /</span>({item?.part_quantity}) <button type="button" disabled={deletePartLoading} onClick={() => handleDelete(item.id, item?.part_name, item?.part_desc)}>{deletePartLoading ? '...' : <XMarkIcon className="h-4 w-4" />}</button>
                                    </p>
                                </div>
                            )) : "No parts for this task"}
                            {part_data?.length > 0 ? (
                                <div className="">
                                    {/* addPartOnRepairshopr */}
                                    <Button className="w-full outline-none bg-[#082f49] my-2 hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985]" type="button" onClick={addPartOnRepairshopr} disabled={addPartOnRepairshoprLoading}>{addPartOnRepairshoprLoading ? 'Adding...' : 'Send to ticket'} </Button>

                                    <p className="text-sm font-medium text-gray-800 mb-2">Total parts: {part_data?.length}</p>
                                </div>
                            ) : null}
                        </div>


                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Add parts order info</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <Input type="text" className="outline-none" placeholder="Part order id" name="parts_order_id" value={parts_order_id || ''} onChange={(e) => setPartsOrderId(e.target.value)} />
                            <Button className="w-full mt-2" type="button" onClick={submitPartOrderId} disabled={submitPartOrderIdLoading}>{submitPartOrderIdLoading ? 'Adding...' : 'Send order to ticket'} </Button>

                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Parts issued</AccordionTrigger>
                    <AccordionContent>
                        <div className="my-3">
                            <Label htmlFor="partsIssuedText">Add comment to go with these parts</Label>
                            <Textarea
                                placeholder="Parts issued to: "
                                name="partsIssuedText"
                                value={partsIssuedText}
                                onChange={(e) => setIssuedExtraText(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                Select All
                            </label>
                            <ul>
                                {part_data.map((part: any) => {
                                    const isSelected = selectedParts.some((p) => p.id === part.id);
                                    const sealNumber = selectedParts.find((p) => p.id === part.id)?.seal_number || "";

                                    return (
                                        <li key={part.id} className="flex gap-2 items-center">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handlePartChange(part.id, part.part_name)}
                                                />
                                                {part.part_name}
                                            </label>
                                            <>
                                                {isSelected && (
                                                    <input
                                                        type="text"
                                                        placeholder="Seal Number (Optional)"
                                                        value={sealNumber ?? part?.seal_number ?? ""}
                                                        onChange={(e) => handleSealNumberChange(part.id, e.target.value)}
                                                        className="border p-1 rounded"
                                                    />

                                                )}
                                                {part?.seal_number ? (
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        (Seal: {part?.seal_number})
                                                    </span>
                                                ) : null}
                                                {part?.part_issued ? (
                                                    <span className="ml-2 text-sm text-green-700">
                                                        Issued
                                                    </span>
                                                ) : null}
                                            </>

                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <Button className="w-full mt-2" type="button" onClick={submitPartsIssued} disabled={issuedPartsLoading}>{issuedPartsLoading ? 'Adding...' : 'Send parts issued to ticket'} </Button>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button className="w-full outline-none" type="button" onClick={submitPartsUpdate} disabled={submitPartsUpdateLoading}>{submitPartsUpdateLoading ? 'Loading...' : 'Update parts section'}</Button>

        </div >
    )
}

export default Parts