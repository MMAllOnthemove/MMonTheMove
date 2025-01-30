import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import React from 'react';
const FormWrapper = dynamic(() => import('./wrapper'), { ssr: false })


interface ISectionThree {


    tail_lights: string;
    setTaillights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    turn_indicator_lights: string;
    setIndicatorLights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    stop_lights: string;
    setStopLights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    doors: string;
    setDoors: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tail_lights_fail_reason: string;
    setTaillightsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    turn_indicator_lights_fail_reason: string;
    setTailIndicatorLightsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    stop_lights_fail_reason: string;
    setStopLightsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    doors_fail_reason: string;
    setDoorsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;



}



const SectionThree: React.FC<ISectionThree> = ({ tail_lights, setTaillights, turn_indicator_lights, setIndicatorLights, stop_lights, setStopLights, doors, setDoors, tail_lights_fail_reason, setTaillightsFailReason, turn_indicator_lights_fail_reason, setTailIndicatorLightsFailReason, stop_lights_fail_reason, setStopLightsFailReason, doors_fail_reason, setDoorsFailReason }) => {
    return (
        <FormWrapper title='External check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Tail lights:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tail_lights"
                            checked={tail_lights === 'Fail'}
                            value="Fail"
                            onChange={setTaillights}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tail_lights"
                            checked={tail_lights === 'Pass'}
                            value="Pass"
                            onChange={setTaillights}
                        /> Pass
                    </div>
                    {
                        tail_lights === 'Fail' ? <div>
                            <Textarea placeholder="Reason for tail lights failing." value={tail_lights_fail_reason} onChange={setTaillightsFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Turn indicator lights:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="turn_indicator_lights"
                            checked={turn_indicator_lights === 'Fail'}
                            value="Fail"
                            onChange={setIndicatorLights}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="turn_indicator_lights"
                            checked={turn_indicator_lights === 'Pass'}
                            value="Pass"
                            onChange={setIndicatorLights}
                        /> Pass
                    </div>
                    {
                        turn_indicator_lights === 'Fail' ? <div>
                            <Textarea placeholder="Reason for tail indicator lights failing." value={turn_indicator_lights_fail_reason} onChange={setTailIndicatorLightsFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Stop lights:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="stop_lights"
                            checked={stop_lights === 'Fail'}
                            value="Fail"
                            onChange={setStopLights}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="stop_lights"
                            checked={stop_lights === 'Pass'}
                            value="Pass"
                            onChange={setStopLights}
                        /> Pass
                    </div>
                    {
                        stop_lights === 'Fail' ? <div>
                            <Textarea placeholder="Reason for stop lights failing." value={stop_lights_fail_reason} onChange={setStopLightsFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Doors:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="doors"
                            checked={doors === 'Fail'}
                            value="Fail"
                            onChange={setDoors}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="doors"
                            checked={doors === 'Pass'}
                            value="Pass"
                            onChange={setDoors}
                        /> Pass
                    </div>
                    {
                        doors === 'Fail' ? <div>
                            <Textarea placeholder="Reason for door(s) failing." value={doors_fail_reason} onChange={setDoorsFailReason} />
                        </div> : null
                    }
                </div>


            </div>


        </FormWrapper>
    )
}

export default SectionThree