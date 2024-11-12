"use client"
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react'
import { CheckedState } from '@radix-ui/react-checkbox';
import { datetimestamp } from '@/lib/date_formats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TPartsHHPUpdate = {
    parts_orderedProp: CheckedState | undefined
    parts_pendingProp: CheckedState | undefined
    parts_issuedProp: CheckedState | undefined
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
    setPartsIssuedDateProp: (data: string) => void;
    addPartLoading: boolean;
    submitPartsUpdateLoading: boolean;
    addPart: (data: React.SyntheticEvent) => void;
    submitPartsUpdate: (data: React.SyntheticEvent) => void;
    errors: {
        part_name?: string;
        part_desc?: string;
        part_quantity?: string;
    }
}
const Parts = ({ parts_orderedProp, parts_pendingProp, parts_issuedProp, setPartsOrderedProp, setPartsOrderedDateProp, setPartsPendingProp, setPartsPendingDateProp, setPartsIssuedProp, setPartsIssuedDateProp, search_part, setSearchPart, part_desc, setPartDesc, part_quantity, setPartQuantity, addPartLoading, addPart, submitPartsUpdateLoading, submitPartsUpdate, errors }: TPartsHHPUpdate) => {
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
    return (
        <form>
            <div className="mb-3">
                <div className="grid items-center grid-cols-4 gap-2 my-3">
                    <div>
                        <Input type="text" placeholder="Part name" name="part_name" value={search_part} className={`${errors.part_name ? 'border border-red-500' : 'border outline-none shadow-none'}`} onChange={(e) => setSearchPart(e.target.value)} />
                        {/* {errors.part_name && <p className="text-sm text-red-500 font-medium">{errors.part_name}</p>} */}

                    </div>
                    <div>
                        <Input type="text" placeholder="Part desc" name="part_desc" disabled value={part_desc} onChange={(e) => setPartDesc(e.target.value)} />
                        {errors.part_desc && <p className="text-sm text-red-500 font-medium">{errors.part_desc}</p>}

                    </div>
                    <div>
                        <Input type="number" placeholder="Quantity" name="part_quantity" size={1} minLength={1} maxLength={1} value={part_quantity} onChange={(e) => setPartQuantity(parseInt(e.target.value, 10))} />
                        {errors.part_quantity && <p className="text-sm text-red-500 font-medium">{errors.part_quantity}</p>}

                    </div>
                    <Button className="w-full outline-none" type="button" onClick={addPart} disabled={addPartLoading}>{addPartLoading ? 'Adding...' : 'Add'} </Button>

                </div>

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
            <Button className="w-full outline-none" type="submit" onClick={submitPartsUpdate} disabled={submitPartsUpdateLoading}>{submitPartsUpdateLoading ? 'Loading...' : 'Update'}</Button>

        </form>
    )
}

export default Parts