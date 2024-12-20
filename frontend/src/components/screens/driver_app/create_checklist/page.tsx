"use client"
import dynamic from 'next/dynamic'


import { Button } from '@/components/ui/button'
import useAddChecklist from '@/hooks/useAddChecklist'
import useUserLoggedIn from '@/hooks/useGetUser'
import { closeModalInParent, VehicleInspection } from '@/lib/types'
import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
const SectionEight = dynamic(() =>
    import('./multistep_form/section_eight')
)
const SectionFive = dynamic(() =>
    import('./multistep_form/section_five')
)
const SectionFour = dynamic(() =>
    import('./multistep_form/section_four')
)
const SectionNine = dynamic(() =>
    import('./multistep_form/section_nine')
)
const SectionOne = dynamic(() =>
    import('./multistep_form/section_one')
)
const SectionSeven = dynamic(() =>
    import('./multistep_form/section_seven')
)
const SectionSix = dynamic(() =>
    import('./multistep_form/section_six')
)
const SectionThree = dynamic(() =>
    import('./multistep_form/section_three')
)
const SectionTwo = dynamic(() =>
    import('./multistep_form/section_two')
)

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
const CreateChecklistScreen: React.FC<closeModalInParent> = ({ onSuccess }) => {
    const { user } = useUserLoggedIn()
    const { addChecklist, addChecklistLoading } = useAddChecklist()
    const [car, setCar] = useState("")
    const [reason_for_use, selectCarUseReason] = useState("")
    const [driver, setDriver] = useState("")
    const [windshield, setWindshield] = useState("")
    const [windshield_fail_reason, setWindshieldFailReason] = useState("")
    const [windshield_wipers, setWindshieldWipers] = useState("")
    const [windshield_wipers_fail_reason, setWindshieldWipersFailReason] = useState("")
    const [headlights, setHeadlights] = useState("")
    const [headlights_fail_reason, setHeadlightsFailReason] = useState("")
    const [rear_window, setRearWindow] = useState("")
    const [rear_window_fail_reason, setRearWindowFailReason] = useState("")
    const [tail_lights, setTaillights] = useState("")
    const [turn_indicator_lights, setIndicatorLights] = useState("")
    const [stop_lights, setStopLights] = useState("")
    const [stop_lights_fail_reason, setStopLightsFailReason] = useState("")
    const [doors, setDoors] = useState("")
    const [tail_lights_fail_reason, setTaillightsFailReason] = useState("")
    const [turn_indicator_lights_fail_reason, setTailIndicatorLightsFailReason] = useState("")
    const [doors_fail_reason, setDoorsFailReason] = useState("")
    const [bumpers, setBumpers] = useState("")
    const [bumpers_fail_reason, setBumpersFailReason] = useState("")
    const [muffler_exhaust_system, setExhaust] = useState("")
    const [muffler_exhaust_system_fail_reason, setExhaustFailReason] = useState("")
    const [tires, setTires] = useState("")
    const [tires_fail_reason, setTiresFailReason] = useState("")
    const [foot_brakes, setFootbrakes] = useState("")
    const [foot_brakes_fail_reason, setFootbrakesFailReason] = useState("")
    const [emergency_brake, setEmergencybrake] = useState("")
    const [emergency_brake_fail_reason, setEmergencybrakeFailReason] = useState("")
    const [steering_wheel, setSteeringWheel] = useState("")
    const [steering_wheel_fail_reason, setSteeringWheelFailReason] = useState("")
    const [front_seat_adjustment, setFrontSeatAdjustment] = useState("")
    const [front_seat_adjustment_fail_reason, setFrontSeatAdjustmentFailReason] = useState("")
    const [horn, setHorn] = useState("")
    const [horn_fail_reason, setHornFailReason] = useState("")
    const [speedometer, setSpeedometer] = useState("")
    const [speedometer_fail_reason, setSpeedometerFailReason] = useState("")
    const [interior_exterior_view_mirros, setInteriorExteriorMirror] = useState("")
    const [interior_exterior_view_mirros_fail_reason, setInteriorExteriorMirrorFailReason] = useState("")
    const [safety_belts, setSafetyBelts] = useState("")
    const [safety_belts_fail_reason, setSafetyBeltsFailReason] = useState("")
    const [spare_wheel_fail_reason, setSpareWheelFailReason] = useState("")
    const [engine_start_stop, setStartStop] = useState("")
    const [engine_start_stop_fail_reason, setStartStopFailReason] = useState("")
    const [mileage, setMileage] = useState("")
    const [triangle, setTriangle] = useState("")
    const [triangle_fail_reason, setTriangleFailReason] = useState("")
    const [car_jack, setCarJack] = useState("")
    const [car_jack_fail_reason, setCarJackFailReason] = useState("")
    const [spare_wheel, setSpareWheel] = useState("")
    const [next_service_date, setNextServiceDate] = useState("")
    const [next_service_kms, setNextServiceKms] = useState("")
    const [license_disc_expiry, setLicenseDiscExpiry] = useState("")

    const [hass, setHass] = useState("")
    const [hass_fail_reason, setHassFailReason] = useState("")
    const [tools, setTools] = useState("")
    const [tools_fail_reason, setToolsFailReason] = useState("")

    const [checklistFiles, setChecklistFiles] = useState([]);
    const [checklistFilesUploading, setChecklistFilesUploading] = useState(false);

    const [resultingRows, setResultingRows] = useState<VehicleInspection[]>([]);
    // const [qcFilesUrls, setQCFilesUrls] = useState([]);

    const handleChecklistFiles = (event: any) => {
        setChecklistFiles(event.target.files);
    };

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 9)); // Adjust this if you add more steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };



    // send form values to backend
    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
        const created_by = user?.email
        // Submit the form here
        const payload = {
            created_at,
            created_by,
            car,
            reason_for_use,
            driver,
            windshield,
            windshield_fail_reason,
            windshield_wipers,
            windshield_wipers_fail_reason,
            headlights,
            headlights_fail_reason,
            rear_window,
            rear_window_fail_reason,
            tail_lights,
            turn_indicator_lights,
            stop_lights,
            doors,
            tail_lights_fail_reason,
            turn_indicator_lights_fail_reason,
            stop_lights_fail_reason,
            doors_fail_reason,
            bumpers,
            bumpers_fail_reason,
            muffler_exhaust_system,
            muffler_exhaust_system_fail_reason,
            tires,
            tires_fail_reason,
            foot_brakes,
            foot_brakes_fail_reason,
            emergency_brake,
            emergency_brake_fail_reason,
            steering_wheel,
            steering_wheel_fail_reason,
            front_seat_adjustment,
            front_seat_adjustment_fail_reason,
            horn,
            horn_fail_reason,
            speedometer,
            speedometer_fail_reason,
            interior_exterior_view_mirros,
            interior_exterior_view_mirros_fail_reason,
            safety_belts,
            safety_belts_fail_reason,
            engine_start_stop,
            engine_start_stop_fail_reason,
            mileage,
            triangle,
            triangle_fail_reason,
            car_jack,
            car_jack_fail_reason,
            spare_wheel,
            spare_wheel_fail_reason,
            hass,
            hass_fail_reason,
            tools,
            tools_fail_reason,
            next_service_date,
            next_service_kms,
            license_disc_expiry,
        };
        const response = await addChecklist(payload);

   
        setResultingRows(response?.rows)
        setCar('')
        selectCarUseReason('')
        setDriver('')
        setWindshield('')
        setWindshieldFailReason('')
        setWindshieldWipers('')
        setWindshieldWipersFailReason('')
        setHeadlights('')
        setHeadlightsFailReason('')
        setRearWindow('')
        setRearWindowFailReason('')
        setTaillights('')
        setIndicatorLights('')
        setStopLights('')
        setStopLightsFailReason('')
        setStopLights('')
        setDoors('')
        setTaillightsFailReason('')
        setTailIndicatorLightsFailReason('')
        setDoorsFailReason('')
        setBumpers('')
        setBumpersFailReason('')
        setExhaust('')
        setExhaustFailReason('')
        setTires('')
        setTiresFailReason('')
        setFootbrakes('')
        setFootbrakesFailReason('')
        setEmergencybrake('')
        setEmergencybrakeFailReason('')
        setSteeringWheel('')
        setSteeringWheelFailReason('')
        setFrontSeatAdjustment('')
        setFrontSeatAdjustmentFailReason('')
        setHorn('')
        setHornFailReason('')
        setSpeedometer('')
        setSpeedometerFailReason('')
        setInteriorExteriorMirror('')
        setInteriorExteriorMirrorFailReason('')
        setSafetyBelts('')
        setSafetyBeltsFailReason('')
        setStartStop('')
        setStartStopFailReason('')
        setMileage('')
        setTriangle('')
        setTriangleFailReason('')
        setCarJack('')
        setCarJackFailReason('')
        setSpareWheel('')
        setSpareWheelFailReason('')
        setHass('')
        setHassFailReason('')
        setTools('')
        setToolsFailReason('')

    }


    // send files to backend after
    // submit cheklist files to backend and repairshopr
    const submitChecklistFiles = async () => {
        setChecklistFilesUploading(true);
        try {
            const formData = new FormData();
            const carName = resultingRows[0]?.car
            const vehicle_checklist_id = resultingRows[0]?.id
            const created_at = resultingRows[0]?.created_at
            Array.from(checklistFiles).forEach((file: any) => {
                formData.append('files', file);
            });
            // Append car once
            formData.append('car', carName);
            formData.append('vehicle_checklist_id', `${vehicle_checklist_id}`);
            formData.append('created_at', created_at);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files/checklists`, formData, {
                withCredentials: true,
            })

            if (data) {
                toast.success(`${data?.message}`)
                onSuccess?.();  // Call the onSuccess prop to close the modal
                setChecklistFiles([])
            }
            // setQCFilesUrls(data?.fileUrls)
            setChecklistFilesUploading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            setChecklistFilesUploading(false)
            if (process.env.NODE_ENV !== "production") {
                console.error("Error uploading cheklist files:", error);
            }
        }
    }
    return (
        <>


            {
                resultingRows?.length > 0 ?

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Attachments</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex items-center">
                                    <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={handleChecklistFiles} />
                                    <Button className="ml-3" disabled={checklistFilesUploading} onClick={submitChecklistFiles}>{checklistFilesUploading ? 'Uploading' : 'Attach'}</Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion> : (
                        <>

                            <p className='text-center text-sm text-muted-foreground'>Step {step} of 9</p>
                            {step === 1 && <SectionOne next_service_date={next_service_date} setNextServiceDate={setNextServiceDate} next_service_kms={next_service_kms} setNextServiceKms={setNextServiceKms} license_disc_expiry={license_disc_expiry} setLicenseDiscExpiry={setLicenseDiscExpiry} car={car} setCar={(e) => setCar(e)} reason_for_use={reason_for_use} selectCarUseReason={(e) => selectCarUseReason(e)} driver={driver} setDriver={(e) => setDriver(e)} />}
                            {step === 2 && <SectionTwo windshield={windshield} setWindshield={(e) => setWindshield(e.target.value)} windshield_fail_reason={windshield_fail_reason} setWindshieldFailReason={(e) => setWindshieldFailReason(e.target.value)} windshieldWipers={windshield_wipers} setWindshieldWipers={(e) => setWindshieldWipers(e.target.value)} windshield_wipers_fail_reason={windshield_wipers_fail_reason} setWindshieldWipersFailReason={(e) => setWindshieldWipersFailReason(e.target.value)} headlights={headlights} setHeadlights={(e) => setHeadlights(e.target.value)} headlights_fail_reason={headlights_fail_reason} setHeadlightsFailReason={(e) => setHeadlightsFailReason(e.target.value)} rear_window={rear_window} setRearWindow={(e) => setRearWindow(e.target.value)} rear_window_fail_reason={rear_window_fail_reason} setRearWindowFailReason={(e) => setRearWindowFailReason(e.target.value)} />}
                            {step === 3 && <SectionThree tail_lights={tail_lights} setTaillights={(e) => setTaillights(e.target.value)} turn_indicator_lights={turn_indicator_lights} setIndicatorLights={(e) => setIndicatorLights(e.target.value)} stop_lights={stop_lights} setStopLights={(e) => setStopLights(e.target.value)} doors={doors} setDoors={(e) => setDoors(e.target.value)} tail_lights_fail_reason={tail_lights_fail_reason} setTaillightsFailReason={(e) => setTaillightsFailReason(e.target.value)} turn_indicator_lights_fail_reason={turn_indicator_lights_fail_reason} setTailIndicatorLightsFailReason={(e) => setTailIndicatorLightsFailReason(e.target.value)} stop_lights_fail_reason={stop_lights_fail_reason} setStopLightsFailReason={(e) => setStopLightsFailReason(e.target.value)} doors_fail_reason={doors_fail_reason} setDoorsFailReason={(e) => setDoorsFailReason(e.target.value)} />}
                            {step === 4 && <SectionFour bumpers={bumpers} setBumpers={(e) => setBumpers(e.target.value)} bumpers_fail_reason={bumpers_fail_reason} setBumpersFailReason={(e) => setBumpersFailReason(e.target.value)} muffler_exhaust_system={muffler_exhaust_system} setExhaust={(e) => setExhaust(e.target.value)} muffler_exhaust_system_fail_reason={muffler_exhaust_system_fail_reason} setExhaustFailReason={(e) => setExhaustFailReason(e.target.value)} tires={tires} setTires={(e) => setTires(e.target.value)} tires_fail_reason={tires_fail_reason} setTiresFailReason={(e) => setTiresFailReason(e.target.value)} />}
                            {step === 5 && <SectionFive foot_brakes={foot_brakes} setFootbrakes={(e) => setFootbrakes(e.target.value)} foot_brakes_fail_reason={foot_brakes_fail_reason} setFootbrakesFailReason={(e) => setFootbrakesFailReason(e.target.value)} emergency_brake={emergency_brake} setEmergencybrake={(e) => setEmergencybrake(e.target.value)} emergency_brake_fail_reason={emergency_brake_fail_reason} setEmergencybrakeFailReason={(e) => setEmergencybrakeFailReason(e.target.value)} steering_wheel={steering_wheel} setSteeringWheel={(e) => setSteeringWheel(e.target.value)} steering_wheel_fail_reason={steering_wheel_fail_reason} setSteeringWheelFailReason={(e) => setSteeringWheelFailReason(e.target.value)} front_seat_adjustment={front_seat_adjustment} setFrontSeatAdjustment={(e) => setFrontSeatAdjustment(e.target.value)} front_seat_adjustment_fail_reason={front_seat_adjustment_fail_reason} setFrontSeatAdjustmentFailReason={(e) => setFrontSeatAdjustmentFailReason(e.target.value)} />}
                            {step === 6 && <SectionSix horn={horn} setHorn={(e) => setHorn(e.target.value)} horn_fail_reason={horn_fail_reason} setHornFailReason={(e) => setHornFailReason(e.target.value)} speedometer={speedometer} setSpeedometer={(e) => setSpeedometer(e.target.value)} speedometer_fail_reason={speedometer_fail_reason} setSpeedometerFailReason={(e) => setSpeedometerFailReason(e.target.value)} interior_exterior_view_mirros={interior_exterior_view_mirros} setInteriorExteriorMirror={(e) => setInteriorExteriorMirror(e.target.value)} interior_exterior_view_mirros_fail_reason={interior_exterior_view_mirros_fail_reason} setInteriorExteriorMirrorFailReason={(e) => setInteriorExteriorMirrorFailReason(e.target.value)} safety_belts={safety_belts} setSafetyBelts={(e) => setSafetyBelts(e.target.value)} safety_belts_fail_reason={safety_belts_fail_reason} setSafetyBeltsFailReason={(e) => setSafetyBeltsFailReason(e.target.value)} />}
                            {step === 7 && <SectionSeven engine_start_stop={engine_start_stop} setStartStop={(e) => setStartStop(e.target.value)} engine_start_stop_fail_reason={engine_start_stop_fail_reason} setStartStopFailReason={(e) => setStartStopFailReason(e.target.value)} mileage={mileage} setMileage={(e) => setMileage(e.target.value)} />}
                            {step === 8 && <SectionEight triangle={triangle} setTriangle={(e) => setTriangle(e.target.value)} triangle_fail_reason={triangle_fail_reason} setTriangleFailReason={(e) => setTriangleFailReason(e.target.value)} car_jack={car_jack} setCarJack={(e) => setCarJack(e.target.value)} car_jack_fail_reason={car_jack_fail_reason} setCarJackFailReason={(e) => setCarJackFailReason(e.target.value)} spare_wheel={spare_wheel} setSpareWheel={(e) => setSpareWheel(e.target.value)} spare_wheel_fail_reason={spare_wheel_fail_reason} setSpareWheelFailReason={(e) => setSpareWheelFailReason(e.target.value)} />}
                            {step === 9 && <SectionNine hass={hass} setHass={(e) => setHass(e.target.value)} hass_fail_reason={hass_fail_reason} setHassFailReason={(e) => setHassFailReason(e.target.value)} tools={tools} setTools={(e) => setTools(e.target.value)} tools_fail_reason={tools_fail_reason} setToolsFailReason={(e) => setToolsFailReason(e.target.value)} />}
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
                                {step < 9 && (
                                    <Button
                                        type="button"
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </Button>
                                )}

                                {step == 9 && (
                                    <Button
                                        type="button"
                                        disabled={addChecklistLoading}
                                        onClick={submit}
                                        className="px-4 py-2 font-semibold text-white bg-gray-900 rounded hover:bg-green-700"
                                    >
                                        {addChecklistLoading ? 'Creating...' :
                                            'Submit'}
                                    </Button>
                                )}
                            </div>

                        </>
                    )}
        </>
    )
}

export default CreateChecklistScreen