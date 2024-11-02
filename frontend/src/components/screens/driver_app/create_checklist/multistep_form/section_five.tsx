import React from 'react';
import FormWrapper from './wrapper';


interface ISectionFive {

    horn: string;
    setHorn: (event: React.ChangeEvent<HTMLInputElement>) => void;
    speedometer: string;
    setSpeedometer: (event: React.ChangeEvent<HTMLInputElement>) => void;
    interior_exterior_view_mirros: string;
    setInteriorExteriorMirror: (event: React.ChangeEvent<HTMLInputElement>) => void;
    safety_belts: string;
    setSafetyBelts: (event: React.ChangeEvent<HTMLInputElement>) => void;

}



const SectionFive: React.FC<ISectionFive> = ({ horn, setHorn, speedometer, setSpeedometer, interior_exterior_view_mirros, setInteriorExteriorMirror, safety_belts, setSafetyBelts }) => {
    return (
        <FormWrapper title='Internal check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Horn:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="horn"
                            checked={horn === 'Fail'}
                            value="Fail"
                            onChange={setHorn}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="horn"
                            checked={horn === 'Pass'}
                            value="Pass"
                            onChange={setHorn}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Speedomter:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="speedometer"
                            checked={speedometer === 'Fail'}
                            value="Fail"
                            onChange={setSpeedometer}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="speedometer"
                            checked={speedometer === 'Pass'}
                            value="Pass"
                            onChange={setSpeedometer}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Inside exterior view mirror:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="interior_exterior_view_mirros"
                            checked={interior_exterior_view_mirros === 'Fail'}
                            value="Fail"
                            onChange={setInteriorExteriorMirror}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="interior_exterior_view_mirros"
                            checked={interior_exterior_view_mirros === 'Pass'}
                            value="Pass"
                            onChange={setInteriorExteriorMirror}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Safety belts:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="safety_belts"
                            checked={safety_belts === 'Fail'}
                            value="Fail"
                            onChange={setSafetyBelts}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="safety_belts"
                            checked={safety_belts === 'Pass'}
                            value="Pass"
                            onChange={setSafetyBelts}
                        /> Pass
                    </div>
                </div>



            </div>


        </FormWrapper>
    )
}

export default SectionFive