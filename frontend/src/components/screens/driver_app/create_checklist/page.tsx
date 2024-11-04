"use client"
import React, { useState } from 'react'
import SectionOne from './multistep_form/section_one'
import SectionTwo from './multistep_form/section_two'
import SectionThree from './multistep_form/section_three'
import SectionFour from './multistep_form/section_four'
import SectionFive from './multistep_form/section_five'
import SectionSix from './multistep_form/section_six'
import SectionSeven from './multistep_form/section_seven'
import SectionEight from './multistep_form/section_eight'
import SectionNine from './multistep_form/section_nine'
import SectionTen from './multistep_form/section_ten'
import useAddChecklist from '@/hooks/useAddChecklist'
import { datetimestamp } from '@/lib/date_formats'
import useUserLoggedIn from '@/hooks/useGetUser'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { closeModalInParent } from '@/lib/types'

const CreateChecklistScreen: React.FC<closeModalInParent> = ({ onSuccess }) => {
    const { user } = useUserLoggedIn()
    const { addChecklist, addChecklistLoading } = useAddChecklist()
    const [windshield, setWindshield] = useState("")
    const [windshield_wipers, setWindshieldWipers] = useState("")
    const [headlights, setHeadlights] = useState("")
    const [rear_window, setRearWindow] = useState("")
    const [tail_lights, setTaillights] = useState("")
    const [turn_indicator_lights, setIndicatorLights] = useState("")
    const [stop_lights, setStopLights] = useState("")
    const [doors, setDoors] = useState("")
    const [bumpers, setBumpers] = useState("")
    const [muffler_exhaust_system, setExhaust] = useState("")
    const [tires, setTires] = useState("")
    const [foot_brakes, setFootbrakes] = useState("")
    const [emergency_brake, setEmergencybrake] = useState("")
    const [steering_wheel, setSteeringWheel] = useState("")
    const [front_seat_adjustment, setFrontSeatAdjustment] = useState("")
    const [horn, setHorn] = useState("")
    const [speedometer, setSpeedometer] = useState("")
    const [interior_exterior_view_mirros, setInteriorExteriorMirror] = useState("")
    const [safety_belts, setSafetyBelts] = useState("")

    const [engine_start_stop, setStartStop] = useState("")
    const [mileage, setMileage] = useState<string>('')
    const [next_service_date, setNextServiceDate] = useState("")
    const [cost_of_service, setCostOfService] = useState('0')
    const [car, setCar] = useState("")
    const [reason_for_use, selectCarUseReason] = useState("")
    const [triangle, setTriangle] = useState("")
    const [car_jack, setCarJack] = useState("")
    const [spare_wheel, setSpareWheel] = useState("")
    const [hass, setHass] = useState("")
    const [tools, setTools] = useState("")
    const [driver, setDriver] = useState("")
    const [final_comment, setFinalComment] = useState("")


    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 10)); // Adjust this if you add more steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_at = datetimestamp;
        const created_by = user?.email
        // Submit the form here
        const payload = { created_at, created_by, driver, windshield, windshield_wipers, headlights, rear_window, tail_lights, turn_indicator_lights, stop_lights, doors, bumpers, muffler_exhaust_system, tires, foot_brakes, emergency_brake, steering_wheel, front_seat_adjustment, horn, speedometer, interior_exterior_view_mirros, safety_belts, engine_start_stop, mileage, next_service_date, cost_of_service, car, reason_for_use, triangle, car_jack, spare_wheel, hass, tools, final_comment }
        const response = await addChecklist(payload);
        if (response?.status === 201) {
            toast.success(`${response?.data?.message}`);
            onSuccess?.();  // Call the onSuccess prop to close the modal
        }
    }

    return (
        <>
            <p className='text-center text-sm text-muted-foreground'>Step {step} of 10</p>
            {step === 1 && <SectionOne windshield={windshield} setWindshield={(e) => setWindshield(e.target.value)} windshieldWipers={windshield_wipers} setWindshieldWipers={(e) => setWindshieldWipers(e.target.value)} headlights={headlights} setHeadlights={(e) => setHeadlights(e.target.value)} rear_window={rear_window} setRearWindow={(e) => setRearWindow(e.target.value)} />}
            {step === 2 && <SectionTwo tail_lights={tail_lights} setTaillights={(e) => setTaillights(e.target.value)} turn_indicator_lights={turn_indicator_lights} setIndicatorLights={(e) => setIndicatorLights(e.target.value)} stop_lights={stop_lights} setStopLights={(e) => setStopLights(e.target.value)} doors={doors} setDoors={(e) => setDoors(e.target.value)} />}
            {step === 3 && <SectionThree bumpers={bumpers} setBumpers={(e) => setBumpers(e.target.value)} muffler_exhaust_system={muffler_exhaust_system} setExhaust={(e) => setExhaust(e.target.value)} tires={tires} setTires={(e) => setTires(e.target.value)} />}
            {step === 4 && <SectionFour foot_brakes={foot_brakes} setFootbrakes={(e) => setFootbrakes(e.target.value)} emergency_brake={emergency_brake} setEmergencybrake={(e) => setEmergencybrake(e.target.value)} steering_wheel={steering_wheel} setSteeringWheel={(e) => setSteeringWheel(e.target.value)} front_seat_adjustment={front_seat_adjustment} setFrontSeatAdjustment={(e) => setFrontSeatAdjustment(e.target.value)} />}
            {step === 5 && <SectionFive horn={horn} setHorn={(e) => setHorn(e.target.value)} speedometer={speedometer} setSpeedometer={(e) => setSpeedometer(e.target.value)} interior_exterior_view_mirros={interior_exterior_view_mirros} setInteriorExteriorMirror={(e) => setInteriorExteriorMirror(e.target.value)} safety_belts={safety_belts} setSafetyBelts={(e) => setSafetyBelts(e.target.value)} />}
            {step === 6 && <SectionSix engine_start_stop={engine_start_stop} setStartStop={(e) => setStartStop(e.target.value)} mileage={mileage} setMileage={(e) => setMileage(e.target.value)} />}
            {step === 7 && <SectionSeven next_service_date={next_service_date} setNextServiceDate={(e) => setNextServiceDate(e.target.value)} cost_of_service={cost_of_service} setCostOfService={(e) => setCostOfService(e.target.value)} />}
            {step === 8 && <SectionEight car={car} setCar={(e) => setCar(e)} reason_for_use={reason_for_use} selectCarUseReason={(e) => selectCarUseReason(e)} />}
            {step === 9 && <SectionNine triangle={triangle} setTriangle={(e) => setTriangle(e.target.value)} car_jack={car_jack} setCarJack={(e) => setCarJack(e.target.value)} spare_wheel={spare_wheel} setSpareWheel={(e) => setSpareWheel(e.target.value)} />}
            {step === 10 && <SectionTen hass={hass} setHass={(e) => setHass(e.target.value)} tools={tools} setTools={(e) => setTools(e.target.value)} final_comment={final_comment} setFinalComment={(e) => setFinalComment(e.target.value)} driver={driver} setDriver={(e) => setDriver(e)} />}
            <div className="flex justify-between mt-4">
                {step > 1 && (
                    <Button
                        type="button"
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={prevStep}
                    >
                        Back
                    </Button>
                )}
                {step < 10 && (
                    <Button
                        type="button"
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={nextStep}
                    >
                        Next
                    </Button>
                )}

                {step == 10 && (
                    <Button
                        type="button"
                        disabled={addChecklistLoading}
                        onClick={submit}
                        className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700"
                    >
                        {addChecklistLoading ? 'Creating...' :
                            'Submit'}
                    </Button>
                )}
            </div>
        </>
    )
}

export default CreateChecklistScreen