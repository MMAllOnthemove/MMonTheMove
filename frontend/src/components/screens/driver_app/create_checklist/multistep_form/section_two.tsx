import { Textarea } from "@/components/ui/textarea";
import dynamic from 'next/dynamic';
import React from 'react';
const FormWrapper = dynamic(() => import('./wrapper'), { ssr: false })


interface ISectionTwo {

    windshield: string;
    setWindshield: (event: React.ChangeEvent<HTMLInputElement>) => void;
    windshield_fail_reason: string;
    setWindshieldFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    windshieldWipers: string;
    setWindshieldWipers: (event: React.ChangeEvent<HTMLInputElement>) => void;
    windshield_wipers_fail_reason: string;
    setWindshieldWipersFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    headlights: string;
    setHeadlights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    headlights_fail_reason: string;
    setHeadlightsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rear_window: string;
    setRearWindow: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rear_window_fail_reason: string;
    setRearWindowFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;



}



const SectionTwo: React.FC<ISectionTwo> = ({ windshield, setWindshield, windshieldWipers, setWindshieldWipers, headlights, setHeadlights, rear_window, setRearWindow, windshield_fail_reason, setWindshieldFailReason, windshield_wipers_fail_reason, setWindshieldWipersFailReason, headlights_fail_reason, setHeadlightsFailReason, rear_window_fail_reason, setRearWindowFailReason }) => {
    return (
        <FormWrapper title='External check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Windshield Check:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="windshield-check"
                            checked={windshield === 'Fail'}
                            value="Fail"

                            onChange={setWindshield}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="windshield-check"
                            checked={windshield === 'Pass'}
                            value="Pass"

                            onChange={setWindshield}
                        /> Pass
                    </div>
                    {
                        windshield === 'Fail' ? <div>
                            <Textarea placeholder="Reason for windshield failing." value={windshield_fail_reason} onChange={setWindshieldFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Windshield wipers:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="windshield-wipers"
                            value="Fail"
                            checked={windshieldWipers === 'Fail'}
                            onChange={setWindshieldWipers}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="windshield-wipers"
                            value="Pass"
                            checked={windshieldWipers === 'Pass'}
                            onChange={setWindshieldWipers}
                        /> Pass
                    </div>
                    {
                        windshieldWipers === 'Fail' ? <div>
                            <Textarea placeholder="Reason for windshield wipers failing." value={windshield_wipers_fail_reason} onChange={setWindshieldWipersFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Rear window:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="rear_window"
                            value="Fail"
                            checked={rear_window === 'Fail'}
                            onChange={setRearWindow}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="rear_window"
                            value="Pass"
                            checked={rear_window === 'Pass'}
                            onChange={setRearWindow}
                        /> Pass
                    </div>
                    {
                        rear_window === 'Fail' ? <div>
                            <Textarea placeholder="Reason for rear window failing." value={rear_window_fail_reason} onChange={setRearWindowFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Headlights:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="headlights"
                            value="Fail"
                            checked={headlights === 'Fail'}
                            onChange={setHeadlights}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="headlights"
                            value="Pass"
                            checked={headlights === 'Pass'}
                            onChange={setHeadlights}
                        /> Pass
                    </div>
                    {
                        headlights === 'Fail' ? <div>
                            <Textarea placeholder="Reason for head lights failing." value={headlights_fail_reason} onChange={setHeadlightsFailReason} />
                        </div> : null
                    }
                </div>

            </div>


        </FormWrapper>
    )
}

export default SectionTwo