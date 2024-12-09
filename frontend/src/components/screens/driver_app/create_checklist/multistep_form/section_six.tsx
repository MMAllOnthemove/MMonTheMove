import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import FormWrapper from './wrapper';


interface ISectionSix {

    horn: string;
    setHorn: (event: React.ChangeEvent<HTMLInputElement>) => void;
    horn_fail_reason: string;
    setHornFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    speedometer: string;
    setSpeedometer: (event: React.ChangeEvent<HTMLInputElement>) => void;
    speedometer_fail_reason: string;
    setSpeedometerFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    interior_exterior_view_mirros: string;
    setInteriorExteriorMirror: (event: React.ChangeEvent<HTMLInputElement>) => void;
    interior_exterior_view_mirros_fail_reason: string;
    setInteriorExteriorMirrorFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    safety_belts: string;
    setSafetyBelts: (event: React.ChangeEvent<HTMLInputElement>) => void;
    safety_belts_fail_reason: string;
    setSafetyBeltsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

}






const SectionSix: React.FC<ISectionSix> = ({ horn, setHorn, speedometer, setSpeedometer, interior_exterior_view_mirros, setInteriorExteriorMirror, safety_belts, setSafetyBelts, horn_fail_reason, setHornFailReason, speedometer_fail_reason, setSpeedometerFailReason, interior_exterior_view_mirros_fail_reason, setInteriorExteriorMirrorFailReason, safety_belts_fail_reason, setSafetyBeltsFailReason }) => {
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
                    {
                        horn === 'Fail' ? <div>
                            <Textarea placeholder="Reason for horn failing." value={horn_fail_reason} onChange={setHornFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Speedometer:</label>
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
                    {
                        speedometer === 'Fail' ? <div>
                            <Textarea placeholder="Reason for speedometer failing." value={speedometer_fail_reason} onChange={setSpeedometerFailReason} />
                        </div> : null
                    }
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
                    {
                        interior_exterior_view_mirros === 'Fail' ? <div>
                            <Textarea placeholder="Reason for internal exterior view mirror failing." value={interior_exterior_view_mirros_fail_reason} onChange={setInteriorExteriorMirrorFailReason} />
                        </div> : null
                    }
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
                    {
                        safety_belts === 'Fail' ? <div>
                            <Textarea placeholder="Reason for seat belts failing." value={safety_belts_fail_reason} onChange={setSafetyBeltsFailReason} />
                        </div> : null
                    }
                </div>



            </div>


        </FormWrapper>
    )
}

export default SectionSix