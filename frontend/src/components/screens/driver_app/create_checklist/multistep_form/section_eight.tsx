import React from 'react';
import FormWrapper from './wrapper';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import cars from '@/lib/cars';
import vehicle_use_reasons from '@/lib/reasons_for_vehicle_use';

interface ISectionEight {

    car: string;
    setCar: (value: string) => void

    reason_for_use: string;
    selectCarUseReason: (value: string) => void


}



const SectionEight: React.FC<ISectionEight> = ({ car, setCar, reason_for_use, selectCarUseReason }) => {
    return (
        <FormWrapper title='About vehicle'>

            <div className="flex flex-col gap-2">

                <Select name="car" value={car} onValueChange={setCar}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select car" />
                    </SelectTrigger>
                    <SelectContent>
                        {cars.map((dep) => (
                            <SelectItem key={dep.id} value={`${dep.car}`}>{`${dep.car}`}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select name="reason_for_use" value={reason_for_use} onValueChange={selectCarUseReason}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Reason for using vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                        {vehicle_use_reasons.map((dep) => (
                            <SelectItem key={dep.id} value={`${dep.name}`}>{`${dep.name}`}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>


        </FormWrapper>
    )
}

export default SectionEight