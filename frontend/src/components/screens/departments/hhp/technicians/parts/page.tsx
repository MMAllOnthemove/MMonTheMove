"use client"
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react'
import { CheckedState } from '@radix-ui/react-checkbox';
import { datetimestamp } from '@/lib/date_formats';
import { Button } from '@/components/ui/button';

type TPartsHHPUpdate = {
    parts_orderedProp: CheckedState | undefined
    parts_pendingProp: CheckedState | undefined
    parts_issuedProp: CheckedState | undefined
    setPartsOrderedProp: (data: CheckedState | undefined) => void;
    setPartsOrderedDateProp: (data: string) => void;
    setPartsPendingProp: (data: CheckedState | undefined) => void;
    setPartsPendingDateProp: (data: string) => void;
    setPartsIssuedProp: (data: CheckedState | undefined) => void;
    setPartsIssuedDateProp: (data: string) => void;
    submitPartsUpdate: (data: React.SyntheticEvent) => void;

}
const Parts = ({ parts_orderedProp, parts_pendingProp, parts_issuedProp, setPartsOrderedProp, setPartsOrderedDateProp, setPartsPendingProp, setPartsPendingDateProp, setPartsIssuedProp, setPartsIssuedDateProp, submitPartsUpdate }: TPartsHHPUpdate) => {
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
            <hr className="py-2" />
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
            <Button className="w-full outline-none" type="submit" onClick={submitPartsUpdate}> Update</Button>

        </form>
    )
}

export default Parts