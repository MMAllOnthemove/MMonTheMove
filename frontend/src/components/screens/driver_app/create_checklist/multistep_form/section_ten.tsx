import React from 'react';
import FormWrapper from './wrapper';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetchDrivers from '@/hooks/useFetchDrivers';

interface ISectionTen {

    hass: string;
    setHass: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tools: string;
    setTools: (event: React.ChangeEvent<HTMLInputElement>) => void;
    final_comment: string;
    setFinalComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    driver: string;
    setDriver: (value: string) => void
}



const SectionTen: React.FC<ISectionTen> = ({ driver, setDriver, hass, setHass, tools, setTools, final_comment, setFinalComment }) => {
    const { driversList } = useFetchDrivers()
    return (
        <FormWrapper title='Accessories'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Hass:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="hass"
                            checked={hass === 'Fail'}
                            value="Fail"
                            onChange={setHass}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="hass"
                            checked={hass === 'Pass'}
                            value="Pass"
                            onChange={setHass}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Handy tools:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tools"
                            checked={tools === 'Fail'}
                            value="Fail"
                            onChange={setTools}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tools"
                            checked={tools === 'Pass'}
                            value="Pass"
                            onChange={setTools}
                        /> Pass
                    </div>
                </div>

                <div className='mb-3'>
                    <Select name="driver" value={driver} onValueChange={setDriver}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                            {driversList.map((dep) => (
                                <SelectItem key={dep.id} value={`${dep.driver_firstname} ${dep.driver_lastname}`}>{`${dep.driver_firstname} ${dep.driver_lastname}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Textarea placeholder="Final remark" value={final_comment}
                        onChange={setFinalComment} />
                </div>


            </div>


        </FormWrapper>
    )
}

export default SectionTen