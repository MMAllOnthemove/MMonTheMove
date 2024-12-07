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

type TCarsModal = {
    openAddModal: boolean;
    setOpenAddModal: (data: boolean) => void;
    plate_number: string;
    setPlateNumber: (data: string) => void;
    car_model: string;
    setCarModel: (data: string) => void;
    errors: {
        plate_number?: string;
        car_model?: string;
    }
    addCars: (data: string | any) => void;
    addCarsLoading: boolean;

}
const CarsModal = ({ openAddModal, setOpenAddModal, plate_number, setPlateNumber, car_model, setCarModel, errors, addCars, addCarsLoading }: TCarsModal) => {
    return (
        <>
            {
                openAddModal && <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add booking agent</DialogTitle>
                            <DialogDescription>
                                {/*  */}
                            </DialogDescription>
                        </DialogHeader>
                        <form>
                            <div className="space-y-3 mb-3">
                                <Label htmlFor="plate_number">Plate number</Label>
                                <Input
                                    value={plate_number}
                                    onChange={(e) => setPlateNumber(e.target.value)}
                                    name="text"
                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                />
                                {errors.plate_number && <p className="text-sm text-red-500 font-medium">{errors.plate_number}</p>}
                            </div>
                            <div className="space-y-3 mb-3">
                                <Label htmlFor="agent_lastname">Car model</Label>
                                <Input
                                    value={car_model}
                                    onChange={(e) => setCarModel(e.target.value)}
                                    name="email"
                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                />
                                {errors.car_model && <p className="text-sm text-red-500 font-medium">{errors.car_model}</p>}
                            </div>

                            <Button className="w-full outline-none" type="submit" onClick={addCars} disabled={addCarsLoading}>{addCarsLoading ? 'Creating...' : 'Add cars'}</Button>
                        </form>


                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default CarsModal