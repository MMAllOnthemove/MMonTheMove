"use client"
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import Sidebar from '@/components/sidebar/page';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import useFetchChecklist from '@/hooks/useGetSingleChecklist';
import useUserLoggedIn from '@/hooks/useGetUser';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import useUpdateChecklist from '@/hooks/updateChecklist';
import openInNewTab from '@/lib/open_new_tab';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
const SingleChecklistScreen = () => {
    const params = useParams(); // Fetch URL parameters
    const id = params?.id;
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { checklist } = useFetchChecklist(id)
    const [mileage_after, setMileageAfter] = useState<string>('')
    const [next_service_kms, setNextServiceKms] = useState<string>('')
    const [next_service_date, setNextService] = useState<string>('')
    const [license_disc_expiry, setLicenseExpiryDate] = useState<string>('')
    const [openChecklistRow, setOpenChecklistRow] = useState<string | null | any>(null);
    const { updateChecklist, loadUpdateChecklist } = useUpdateChecklist()
    const [checklistFilesUploading, setChecklistFilesUploading] = useState(false);
    const [checklistFiles, setChecklistFiles] = useState([]);


    useEffect(() => {
        if (checklist) {
            setMileageAfter(checklist[0]?.mileage_after)
            setNextServiceKms(checklist[0]?.next_service_kms)
            setNextService(checklist[0]?.next_service_date)
            setLicenseExpiryDate(checklist[0]?.license_disc_expiry)
        }
    }, [checklist])

    // update the mileage after return
    const updateVehicleChecklist = async () => {
        const rowId = id
        const payload = { rowId, mileage_after, next_service_date, next_service_kms, license_disc_expiry }
        await updateChecklist(rowId, payload)
    }

    const handleChecklistRowClick = (key: string | null) => {
        setOpenChecklistRow((prev: any) => (prev === key ? null : key));
    };

    const handleChecklistFiles = (event: any) => {
        setChecklistFiles(event.target.files);
    };

    // send files to backend after
    // submit cheklist files to backend and repairshopr
    const submitChecklistFiles = async () => {
        setChecklistFilesUploading(true);
        try {
            const formData = new FormData();
            const carName = checklist[0]?.car
            const vehicle_checklist_id = checklist[0]?.id
            const created_at = checklist[0]?.created_at
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
            {/* <h1>Checklist Detail</h1>
            <p>Checklist ID: {id}</p> */}

            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (<>
                    <Sidebar />
                    <main className='container p-1'>
                        <PageTitle title="Checklist" hasSpan={true} spanText={"Vehicle"} />
                        {checklist ?
                            checklist?.map((x) => (
                                <Accordion type="single" collapsible key={x?.id}>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>External tests</AccordionTrigger>
                                        <AccordionContent>
                                            <div>
                                                <ul className="list-decimal list-inside">
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('windshield')}>Windshield: <span className={`${x?.windshield === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.windshield}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'windshield' && x?.windshield !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.windshield_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('rear_window')}>Rear window: <span className={`${x?.rear_window === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.rear_window}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'rear_window' && x?.rear_window !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.rear_window_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('windshield_wipers')}>Windshield wipers: <span className={`${x?.windshield_wipers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.windshield_wipers}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'windshield_wipers' && x?.windshield_wipers !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.windshield_wipers_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('headlights')}>Headlights: <span className={`${x?.headlights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.headlights}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'headlights' && x?.headlights !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.headlights_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('tail_lights')}>Tail lights: <span className={`${x?.tail_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.tail_lights}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'tail_lights' && x?.tail_lights !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.tail_lights_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('turn_indicator_lights')}>Turn indicator lights: <span className={`${x?.turn_indicator_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.turn_indicator_lights}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'turn_indicator_lights' && x?.turn_indicator_lights !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.turn_indicator_lights_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('stop_lights')}>Stop lights: <span className={`${x?.stop_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.stop_lights}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'stop_lights' && x?.stop_lights !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.stop_lights_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('doors')}>Doors: <span className={`${x?.doors === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.doors}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'doors' && x?.doors !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.doors_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('bumpers')}>Bumpers: <span className={`${x?.bumpers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.bumpers}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'bumpers' && x?.bumpers !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.bumpers_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('muffler_exhaust_system')}>Exhaust system: <span className={`${x?.muffler_exhaust_system === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.muffler_exhaust_system}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'muffler_exhaust_system' && x?.muffler_exhaust_system !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.muffler_exhaust_system_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('tires')}>Tires: <span className={`${x?.tires === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.tires}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'tires' && x?.tires !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.tires_fail_reason}</p>
                                                    )}
                                                </ul>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Internal tests</AccordionTrigger>
                                        <AccordionContent>
                                            <div>
                                                <ul className="list-decimal list-inside">
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('foot_brakes')}>Foot brakes: <span className={`${x?.foot_brakes === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.foot_brakes}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'foot_brakes' && x?.foot_brakes !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.foot_brakes_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('emergency_brake')}>Hand brake: <span className={`${x?.emergency_brake === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.emergency_brake}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'emergency_brake' && x?.emergency_brake !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.emergency_brake_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('front_seat_adjustment')}>Front seat adjustment: <span className={`${x?.front_seat_adjustment === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.front_seat_adjustment}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'front_seat_adjustment' && x?.front_seat_adjustment !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.front_seat_adjustment_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('horn')}>Horn: <span className={`${x?.horn === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.horn}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'horn' && x?.horn !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.horn_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('speedometer')}>Speedometer: <span className={`${x?.speedometer === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.speedometer}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'speedometer' && x?.speedometer !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.speedometer_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('interior_exterior_view_mirros')}>Internal mirror: <span className={`${x?.interior_exterior_view_mirros === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.interior_exterior_view_mirros}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'interior_exterior_view_mirros' && x?.interior_exterior_view_mirros !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.interior_exterior_view_mirros_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('safety_belts')}>Safely belts: <span className={`${x?.safety_belts === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.safety_belts}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'safety_belts' && x?.safety_belts !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.safety_belts_fail_reason}</p>
                                                    )}
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('engine_start_stop')}>Engine start/stop: <span className={`${x?.engine_start_stop === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.engine_start_stop}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'engine_start_stop' && x?.engine_start_stop !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.engine_start_stop_fail_reason}</p>
                                                    )}
                                                </ul>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Accessories</AccordionTrigger>
                                        <AccordionContent>

                                            <ul className="list-decimal list-inside">
                                                <li className="cursor-pointer" onClick={() => handleChecklistRowClick('triangle')}>Triangle: <span className={`${x?.triangle === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.triangle}</span></li>
                                                {/* Conditionally show the reason if the row is open */}
                                                {openChecklistRow === 'triangle' && x?.triangle !== "Pass" && (
                                                    <p className="text-gray-500">Reason: {x?.triangle_fail_reason}</p>
                                                )}
                                                <li className="cursor-pointer" onClick={() => handleChecklistRowClick('car_jack')}>Car jack: <span className={`${x?.car_jack === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.car_jack}</span></li>
                                                {/* Conditionally show the reason if the row is open */}
                                                {openChecklistRow === 'car_jack' && x?.car_jack !== "Pass" && (
                                                    <p className="text-gray-500">Reason: {x?.car_jack_fail_reason}</p>
                                                )}
                                                <li className="cursor-pointer" onClick={() => handleChecklistRowClick('spare_wheel')}>Spare wheel: <span className={`${x?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.spare_wheel}</span></li>
                                                {/* Conditionally show the reason if the row is open */}
                                                {openChecklistRow === 'spare_wheel' && x?.spare_wheel !== "Pass" && (
                                                    <p className="text-gray-500">Reason: {x?.spare_wheel_fail_reason}</p>
                                                )}
                                                <li className="cursor-pointer" onClick={() => handleChecklistRowClick('hass')}>Hass: <span className={`${x?.hass === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.hass}</span></li>
                                                {/* Conditionally show the reason if the row is open */}
                                                {openChecklistRow === 'hass' && x?.hass !== "Pass" && (
                                                    <p className="text-gray-500">Reason: {x?.hass_fail_reason}</p>
                                                )}
                                                <li className="cursor-pointer" onClick={() => handleChecklistRowClick('tools')}>Hand tools: <span className={`${x?.tools === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.tools}</span></li>
                                                {/* Conditionally show the reason if the row is open */}
                                                {openChecklistRow === 'tools' && x?.tools !== "Pass" && (
                                                    <p className="text-gray-500">Reason: {x?.tools_fail_reason}</p>
                                                )}
                                            </ul>

                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>Update checklist</AccordionTrigger>
                                        <AccordionContent>
                                            <div>
                                                <Label htmlFor="next_service_date">Next service date</Label>
                                                <Input className="mb-3" type="date" name="next_service_date" placeholder="Next service date" id="next_service_date" value={next_service_date || ""} onChange={(e) => setNextService(e.target.value)} />
                                                <Label htmlFor="mileage_after">Mileage after</Label>
                                                <Input className="mb-3" type="text" name="mileage_after" placeholder="Mileage when driver comes back" id="mileage_after" value={mileage_after || ""} onChange={(e) => setMileageAfter(e.target.value)} />
                                                <Label htmlFor="next_service_kms">Next service kms</Label>
                                                <Input className="mb-3" type="number" name="next_service_kms" placeholder="Next service kms" id="mileage_after" value={next_service_kms || ""} onChange={(e) => setNextServiceKms(e.target.value)} />
                                                <Label htmlFor="license_disc_expiry">Disc expiry date</Label>
                                                <Input className="mb-3" type="date" name="license_disc_expiry" placeholder="License disc expiry date" id="license_disc_expiry" value={license_disc_expiry || ""} onChange={(e) => setLicenseExpiryDate(e.target.value)} />
                                                <Button className="w-full" onClick={updateVehicleChecklist} disabled={loadUpdateChecklist}>{loadUpdateChecklist ? 'Updating...' : 'Update checklist'}</Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>More info</AccordionTrigger>
                                        <AccordionContent>
                                            <div>
                                                <ul className="list-decimal list-inside">
                                                    <li>Driver: <span className="text-gray-600 font-medium">{x?.driver}</span></li>
                                                    <li>Car: <span className="text-gray-600 font-medium">{x?.car}</span></li>
                                                    <li className="cursor-pointer" onClick={() => handleChecklistRowClick('spare_wheel')}>Spare wheel: <span className={`${x?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.spare_wheel}</span></li>
                                                    {/* Conditionally show the reason if the row is open */}
                                                    {openChecklistRow === 'spare_wheel' && x?.spare_wheel !== "Pass" && (
                                                        <p className="text-gray-500">Reason: {x?.spare_wheel_fail_reason}</p>
                                                    )}
                                                    <li>Reason for use: <span className="text-gray-600 font-medium">{x?.reason_for_use}</span></li>
                                                    <li>Mileage start: <span className="text-gray-600 font-medium">{x?.mileage}</span></li>
                                                    <li>Mileage end: <span className="text-gray-600 font-medium">{x?.mileage_after}</span></li>
                                                    <li>Created by: <span className="text-gray-600 font-medium">{x?.created_by}</span></li>
                                                    <li>Created at: <span className="text-gray-600 font-medium">{x?.created_at}</span></li>
                                                </ul>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-6">
                                        <AccordionTrigger>Attachments</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {checklist?.length > 0 ? checklist?.flatMap((item, itemIndex) =>
                                                    item?.image_urls?.map((url: any, urlIndex: any) => (
                                                        <Card key={`${itemIndex}-${urlIndex}`} className="cursor-pointer" onClick={() => openInNewTab(url)}>
                                                            <CardContent className="relative w-full pb-[100%] overflow-hidden">
                                                                {url ?
                                                                    <Image
                                                                        alt={`Checklist image ${urlIndex + 1}`}
                                                                        src={url}
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="absolute top-0 left-0"
                                                                    /> : null}
                                                            </CardContent>
                                                        </Card>
                                                    ))
                                                ) : null}
                                            </div>
                                            <div className="flex items-center">
                                                <Input type="file" multiple className="my-3" onChange={handleChecklistFiles} />
                                                <Button className="ml-3" disabled={checklistFilesUploading} onClick={submitChecklistFiles}>{checklistFilesUploading ? 'Uploading' : 'Attach'}</Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))
                            : (
                                <p>No checklist found for today.</p>
                            )}
                    </main>

                </>) : <NotLoggedInScreen />
            }
        </>
    )
}

export default SingleChecklistScreen