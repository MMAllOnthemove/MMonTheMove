import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import React from 'react';
const FormWrapper = dynamic(() => import('./wrapper'), { ssr: false })

interface ISectionEight {


    triangle: string;
    setTriangle: (event: React.ChangeEvent<HTMLInputElement>) => void;

    triangle_fail_reason: string;
    setTriangleFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    car_jack: string;
    setCarJack: (event: React.ChangeEvent<HTMLInputElement>) => void;
    car_jack_fail_reason: string;
    setCarJackFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    spare_wheel: string;
    setSpareWheel: (event: React.ChangeEvent<HTMLInputElement>) => void;
    spare_wheel_fail_reason: string;
    setSpareWheelFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

}



const SectionEight: React.FC<ISectionEight> = ({ triangle, setTriangle, car_jack, setCarJack, spare_wheel, setSpareWheel, triangle_fail_reason, setTriangleFailReason, car_jack_fail_reason, setCarJackFailReason, spare_wheel_fail_reason, setSpareWheelFailReason }) => {
    return (
        <FormWrapper title='Accessories'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Triangle:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="triangle"
                            checked={triangle === 'Fail'}
                            value="Fail"
                            onChange={setTriangle}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="triangle"
                            checked={triangle === 'Pass'}
                            value="Pass"
                            onChange={setTriangle}
                        /> Pass
                    </div>
                    {
                        triangle === 'Fail' ? <div>
                            <Textarea placeholder="Reason for triangle check failing." value={triangle_fail_reason} onChange={setTriangleFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Car jack:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="car_jack"
                            checked={car_jack === 'Fail'}
                            value="Fail"
                            onChange={setCarJack}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="car_jack"
                            checked={car_jack === 'Pass'}
                            value="Pass"
                            onChange={setCarJack}
                        /> Pass
                    </div>
                    {
                        car_jack === 'Fail' ? <div>
                            <Textarea placeholder="Reason for car jack check failing." value={car_jack_fail_reason} onChange={setCarJackFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Spare wheel:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="spare_wheel"
                            checked={spare_wheel === 'Fail'}
                            value="Fail"
                            onChange={setSpareWheel}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="spare_wheel"
                            checked={spare_wheel === 'Pass'}
                            value="Pass"
                            onChange={setSpareWheel}
                        /> Pass
                    </div>
                    {
                        spare_wheel === 'Fail' ? <div>
                            <Textarea placeholder="Reason for spare wheel check failing." value={spare_wheel_fail_reason} onChange={setSpareWheelFailReason} />
                        </div> : null
                    }
                </div>





            </div>


        </FormWrapper>
    )
}

export default SectionEight