import React from 'react';
import FormWrapper from './wrapper';


interface ISectionFour {

    foot_brakes: string;
    setFootbrakes: (event: React.ChangeEvent<HTMLInputElement>) => void;

    emergency_brake: string;
    setEmergencybrake: (event: React.ChangeEvent<HTMLInputElement>) => void;

    steering_wheel: string;
    setSteeringWheel: (event: React.ChangeEvent<HTMLInputElement>) => void;
    front_seat_adjustment: string;
    setFrontSeatAdjustment: (event: React.ChangeEvent<HTMLInputElement>) => void;



}



const SectionFour: React.FC<ISectionFour> = ({ foot_brakes, setFootbrakes, emergency_brake, setEmergencybrake, steering_wheel, setSteeringWheel, front_seat_adjustment, setFrontSeatAdjustment }) => {
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
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Emergency brake:</label>
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
                </div>



            </div>


        </FormWrapper>
    )
}

export default SectionFour