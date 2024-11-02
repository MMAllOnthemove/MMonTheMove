import React from 'react';
import FormWrapper from './wrapper';


interface ISectionThree {

    bumpers: string;
    setBumpers: (event: React.ChangeEvent<HTMLInputElement>) => void;
    muffler_exhaust_system: string;
    setExhaust: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tires: string;
    setTires: (event: React.ChangeEvent<HTMLInputElement>) => void;




}



const SectionThree: React.FC<ISectionThree> = ({ bumpers, setBumpers, muffler_exhaust_system, setExhaust, tires, setTires }) => {
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
                </div>
            </div>
        </FormWrapper>
    )
}

export default SectionThree