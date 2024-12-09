"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCars from '@/hooks/useGetCars'
import useGetSingleFuelConsumption from '@/hooks/useGetSingleFuelConsumption'

type TFuelModal = {
    openAddModal: boolean;
    setOpenAddModal: (data: boolean) => void;
    receipt_number: number | undefined;
    setReceiptNumber: (data: number) => void;
    plate_number: string | undefined;
    setPlateNumber: (data: string) => void;
    odometer: number | undefined;
    setOdometer: (data: number) => void;
    filled_volume_litres: number | undefined;
    setFilledVolumeLitres: (data: number) => void;
    fuel_price_per_litre: number | undefined;
    setPricePerLitre: (data: number) => void;
    tank_filled: string;
    setTankFilled: (data: string) => void;
    km_travelled_from_last_refill: number;
    litres_travelled_from_last_refill: number;
    total_fill_cost: number;
    km_consumption_per_litre: number;
    litres_consumption_per_100km: number;
    miles_gallon: number;
    cost_of_the_km: number;
    submit: (data: string | any) => void;
    submitLoading: boolean;

}
const FuelConsumptionModal = ({ openAddModal, setOpenAddModal, receipt_number, setReceiptNumber, plate_number, setPlateNumber, odometer, setOdometer, filled_volume_litres, setFilledVolumeLitres, fuel_price_per_litre, setPricePerLitre, tank_filled, setTankFilled, km_travelled_from_last_refill, litres_travelled_from_last_refill, total_fill_cost, km_consumption_per_litre, litres_consumption_per_100km, miles_gallon, cost_of_the_km, submit, submitLoading }: TFuelModal) => {
    const { carsList, carsListLoading } = useCars()
    return (
        <>
            {
                openAddModal && <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>Add consumption</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <form>
                            <Select name="plate_number" value={plate_number} onValueChange={setPlateNumber}>
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Select car" />
                                </SelectTrigger>
                                <SelectContent>
                                    {carsList?.map((x) => (
                                        <SelectItem key={x.id} value={`${x.plate_number}`}>{x.plate_number} {x.car_model}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="grid lg:grid-cols-2 gap-2">


                                <div className="space-y-2 mb-2">
                                    <Label htmlFor="receipt_number">Receipt number</Label>
                                    <Input
                                        value={receipt_number || ""}
                                        onChange={(e) => setReceiptNumber(Number(e.target.value))}
                                        name="receipt_number"
                                        type="number"
                                    />
                                    {/* {errors.agent_firstname && <p className="text-sm text-red-500 font-medium">{errors.agent_firstname}</p>} */}
                                </div>
                                <div className="space-y-2 mb-2">
                                    <Label htmlFor="odometer">Odometer</Label>
                                    <Input
                                        value={odometer || ""}
                                        onChange={(e) => setOdometer(Number(e.target.value))}
                                        min={0}
                                        name="odometer"
                                        type="number"
                                    />
                                    {/* {errors.agent_firstname && <p className="text-sm text-red-500 font-medium">{errors.agent_firstname}</p>} */}
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-2">

                                <div className="space-y-2 mb-2">
                                    <Label htmlFor="filled_volume_litres">Litres filled</Label>
                                    <Input
                                        value={filled_volume_litres || ""}
                                        onChange={(e) => setFilledVolumeLitres(Number(e.target.value))}
                                        min={0}
                                        name="filled_volume_litres"
                                        type="number"
                                        className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                    />
                                    {/* {errors.agent_firstname && <p className="text-sm text-red-500 font-medium">{errors.agent_firstname}</p>} */}
                                </div>
                                <div className="space-y-2 mb-2">
                                    <Label htmlFor="fuel_price_per_litre">Price per litre</Label>
                                    <Input
                                        value={fuel_price_per_litre || ""}
                                        onChange={(e) => setPricePerLitre(Number(e.target.value))}
                                        min={0}
                                        name="fuel_price_per_litre"
                                        type="number"
                                        className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                    />
                                    {/* {errors.agent_firstname && <p className="text-sm text-red-500 font-medium">{errors.agent_firstname}</p>} */}
                                </div>

                            </div>

                            <Select name="tank_filled" value={tank_filled} onValueChange={(e) => setTankFilled(e)}>
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Tank filled?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"Yes"}>Yes</SelectItem>
                                    <SelectItem value={"No"}>No</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className='border rounded-sm mb-2 p-2'>
                                <p className="text-sm">Kms travelled since last fill <span className='font-medium text-sky-600'>{isNaN(km_travelled_from_last_refill) || km_travelled_from_last_refill === Infinity ? '' : km_travelled_from_last_refill}</span></p>
                                <p className="text-sm">Litres travelled since last fill <span className='font-medium text-sky-600'>{isNaN(litres_travelled_from_last_refill) || litres_travelled_from_last_refill === Infinity ? '' : litres_travelled_from_last_refill}</span></p>
                                <p className="text-sm">Fill cost <span className='font-medium text-sky-600'>{isNaN(total_fill_cost) || total_fill_cost === Infinity ? '' : total_fill_cost}</span></p>
                                <p className="text-sm">Km consumption per litre <span className='font-medium text-sky-600'>{isNaN(km_consumption_per_litre) || km_consumption_per_litre === Infinity ? '' : km_consumption_per_litre}</span></p>
                                <p className="text-sm">Km consumption per kilometer(L/100km) <span className='font-medium text-sky-600'>{isNaN(litres_consumption_per_100km) || litres_consumption_per_100km === Infinity ? '' : litres_consumption_per_100km}</span></p>
                                <p className="text-sm">Miles/gallon <span className='font-medium text-sky-600'>{isNaN(miles_gallon) || miles_gallon === Infinity ? '' : miles_gallon}</span></p>
                                <p className="text-sm">Cost of the km (R/km) <span className='font-medium text-sky-600'>{isNaN(cost_of_the_km) || cost_of_the_km === Infinity ? '' : cost_of_the_km}</span></p>
                            </div>


                            <Button className="w-full outline-none" type="submit" onClick={submit} disabled={submitLoading}>{submitLoading ? 'Creating...' : 'Add consumption'}</Button>
                        </form>


                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default FuelConsumptionModal