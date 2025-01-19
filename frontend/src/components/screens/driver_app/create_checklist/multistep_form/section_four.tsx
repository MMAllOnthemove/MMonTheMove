import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import FormWrapper from './wrapper';


interface ISectionFour {

    bumpers: string;
    setBumpers: (event: React.ChangeEvent<HTMLInputElement>) => void;
    bumpers_fail_reason: string;
    setBumpersFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    muffler_exhaust_system: string;
    setExhaust: (event: React.ChangeEvent<HTMLInputElement>) => void;
    muffler_exhaust_system_fail_reason: string;
    setExhaustFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    tires: string;
    setTires: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tires_fail_reason: string;
    setTiresFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;


}



const SectionFour: React.FC<ISectionFour> = ({ bumpers, setBumpers, muffler_exhaust_system, setExhaust, tires, setTires, bumpers_fail_reason, setBumpersFailReason, muffler_exhaust_system_fail_reason, setExhaustFailReason, tires_fail_reason, setTiresFailReason }) => {
    return (
        <FormWrapper title='External check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Bumpers (front and back):</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="bumpers"
                            checked={bumpers === 'Fail'}
                            value="Fail"
                            onChange={setBumpers}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="bumpers"
                            checked={bumpers === 'Pass'}
                            value="Pass"
                            onChange={setBumpers}
                        /> Pass
                    </div>
                    {
                        bumpers === 'Fail' ? <div>
                            <Textarea placeholder="Reason for bumper(s) failing." value={bumpers_fail_reason} onChange={setBumpersFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Exhaust system:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="muffler_exhaust_system"
                            checked={muffler_exhaust_system === 'Fail'}
                            value="Fail"
                            onChange={setExhaust}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="muffler_exhaust_system"
                            checked={muffler_exhaust_system === 'Pass'}
                            value="Pass"
                            onChange={setExhaust}
                        /> Pass
                    </div>
                    {
                        muffler_exhaust_system === 'Fail' ? <div>
                            <Textarea placeholder="Reason for exhaust failing." value={muffler_exhaust_system_fail_reason} onChange={setExhaustFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Tires:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tires"
                            checked={tires === 'Fail'}
                            value="Fail"
                            onChange={setTires}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tires"
                            checked={tires === 'Pass'}
                            value="Pass"
                            onChange={setTires}
                        /> Pass
                    </div>
                    {
                        tires === 'Fail' ? <div>
                            <Textarea placeholder="Reason for tires failing." value={tires_fail_reason} onChange={setTiresFailReason} />
                        </div> : null
                    }
                </div>
            </div>
        </FormWrapper>
    )
}

export default SectionFour