import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import React from 'react';
const FormWrapper = dynamic(() => import('./wrapper'), { ssr: false })

interface ISectionFive {

    foot_brakes: string;
    setFootbrakes: (event: React.ChangeEvent<HTMLInputElement>) => void;
    foot_brakes_fail_reason: string;
    setFootbrakesFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    emergency_brake: string;
    setEmergencybrake: (event: React.ChangeEvent<HTMLInputElement>) => void;

    emergency_brake_fail_reason: string;
    setEmergencybrakeFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    steering_wheel: string;
    setSteeringWheel: (event: React.ChangeEvent<HTMLInputElement>) => void;
    steering_wheel_fail_reason: string;
    setSteeringWheelFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    front_seat_adjustment: string;
    setFrontSeatAdjustment: (event: React.ChangeEvent<HTMLInputElement>) => void;
    front_seat_adjustment_fail_reason: string;
    setFrontSeatAdjustmentFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;




}



const SectionFive: React.FC<ISectionFive> = ({ foot_brakes, setFootbrakes, emergency_brake, setEmergencybrake, steering_wheel, setSteeringWheel, front_seat_adjustment, setFrontSeatAdjustment, foot_brakes_fail_reason, setFootbrakesFailReason, emergency_brake_fail_reason, setEmergencybrakeFailReason, steering_wheel_fail_reason, setSteeringWheelFailReason, front_seat_adjustment_fail_reason, setFrontSeatAdjustmentFailReason }) => {
    return (
        <FormWrapper title='Internal check'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Foot pedals:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="foot_brakes"
                            checked={foot_brakes === 'Fail'}
                            value="Fail"
                            onChange={setFootbrakes}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="foot_brakes"
                            checked={foot_brakes === 'Pass'}
                            value="Pass"
                            onChange={setFootbrakes}
                        /> Pass
                    </div>
                    {
                        foot_brakes === 'Fail' ? <div>
                            <Textarea placeholder="Reason for foot brakes failing." value={foot_brakes_fail_reason} onChange={setFootbrakesFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Hand brake:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="emergency_brake"
                            checked={emergency_brake === 'Fail'}
                            value="Fail"
                            onChange={setEmergencybrake}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="emergency_brake"
                            checked={emergency_brake === 'Pass'}
                            value="Pass"
                            onChange={setEmergencybrake}
                        /> Pass
                    </div>
                    {
                        emergency_brake === 'Fail' ? <div>
                            <Textarea placeholder="Reason for emergency brakes failing." value={emergency_brake_fail_reason} onChange={setEmergencybrakeFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Steering wheel:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="steering_wheel"
                            checked={steering_wheel === 'Fail'}
                            value="Fail"
                            onChange={setSteeringWheel}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="steering_wheel"
                            checked={steering_wheel === 'Pass'}
                            value="Pass"
                            onChange={setSteeringWheel}
                        /> Pass
                    </div>
                    {
                        steering_wheel === 'Fail' ? <div>
                            <Textarea placeholder="Reason for steering wheel failing." value={steering_wheel_fail_reason} onChange={setSteeringWheelFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Front seat adjustment:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="front_seat_adjustment"
                            checked={front_seat_adjustment === 'Fail'}
                            value="Fail"
                            onChange={setFrontSeatAdjustment}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="front_seat_adjustment"
                            checked={front_seat_adjustment === 'Pass'}
                            value="Pass"
                            onChange={setFrontSeatAdjustment}
                        /> Pass
                    </div>
                    {
                        front_seat_adjustment === 'Fail' ? <div>
                            <Textarea placeholder="Reason for front seat failing." value={front_seat_adjustment_fail_reason} onChange={setFrontSeatAdjustmentFailReason} />
                        </div> : null
                    }
                </div>



            </div>


        </FormWrapper>
    )
}

export default SectionFive