import React from 'react';
import FormWrapper from './wrapper';
import { Input } from '@/components/ui/input';


interface ISectionSix {

    engine_start_stop: string;
    setStartStop: (event: React.ChangeEvent<HTMLInputElement>) => void;
    mileage: number;
    setMileage: (event: React.ChangeEvent<HTMLInputElement>) => void;


}



const SectionSix: React.FC<ISectionSix> = ({ engine_start_stop, setStartStop, mileage, setMileage }) => {
    return (
        <FormWrapper title='Internal check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Horn:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="engine_start_stop"
                            checked={engine_start_stop === 'Fail'}
                            value="Fail"
                            onChange={setStartStop}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="engine_start_stop"
                            checked={engine_start_stop === 'Pass'}
                            value="Pass"
                            onChange={setStartStop}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Mileage:</label>
                    <div>
                        <Input
                            type="number"
                            name="mileage"
                            value={mileage}
                            onChange={setMileage}
                        />
                    </div>
                </div>




            </div>


        </FormWrapper>
    )
}

export default SectionSix