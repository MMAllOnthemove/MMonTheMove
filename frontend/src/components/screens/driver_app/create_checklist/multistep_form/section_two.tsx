import React from 'react';
import FormWrapper from './wrapper';


interface ISectionTwo {

    tail_lights: string;
    setTaillights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    turn_indicator_lights: string;
    setIndicatorLights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    stop_lights: string;
    setStopLights: (event: React.ChangeEvent<HTMLInputElement>) => void;
    doors: string;
    setDoors: (event: React.ChangeEvent<HTMLInputElement>) => void;



}



const SectionTwo: React.FC<ISectionTwo> = ({ tail_lights, setTaillights, turn_indicator_lights, setIndicatorLights, stop_lights, setStopLights, doors, setDoors }) => {
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
                </div>


            </div>


        </FormWrapper>
    )
}

export default SectionTwo