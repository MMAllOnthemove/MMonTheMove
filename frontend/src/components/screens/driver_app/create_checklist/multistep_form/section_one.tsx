import React from 'react';
import FormWrapper from './wrapper';


interface ISectionOne {
    windshield: string;
    setWindshield: (event: React.ChangeEvent<HTMLInputElement>) => void;
    windshieldWipers: string;
    setWindshieldWipers: (event: React.ChangeEvent<HTMLInputElement>) => void;
    headlights: string;
    setHeadlights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rear_window: string;
    setRearWindow: (event: React.ChangeEvent<HTMLInputElement>) => void;


}



const SectionOne: React.FC<ISectionOne> = ({ windshield, setWindshield, windshieldWipers, setWindshieldWipers, headlights, setHeadlights, rear_window, setRearWindow }) => {
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
                </div>

            </div>


        </FormWrapper>
    )
}

export default SectionOne