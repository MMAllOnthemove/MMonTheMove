import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import React from 'react';
const FormWrapper = dynamic(() => import('./wrapper'), { ssr: false })

interface ISectionSeven {
    engine_start_stop: string;
    setStartStop: (event: React.ChangeEvent<HTMLInputElement>) => void;
    engine_start_stop_fail_reason: string;
    setStartStopFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    mileage: string;
    setMileage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



const SectionSeven: React.FC<ISectionSeven> = ({ engine_start_stop, setStartStop, mileage, setMileage, engine_start_stop_fail_reason, setStartStopFailReason }) => {
    return (
        <FormWrapper title='Internal check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Start/stop:</label>
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
                    {
                        engine_start_stop === 'Fail' ? <div>
                            <Textarea placeholder="Reason for horn failing." value={engine_start_stop_fail_reason} onChange={setStartStopFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Mileage:</label>
                    <div>
                        <Input
                            name="mileage"
                            type="text"
                            inputMode='decimal'
                            value={mileage}
                            onChange={setMileage}
                        />
                    </div>
                </div>
            </div>


        </FormWrapper>
    )
}

export default SectionSeven