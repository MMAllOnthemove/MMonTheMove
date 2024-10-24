import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import warranties from '@/lib/warranties';

const AddRepairshoprHHPTask = () => {

    /*  
    service_order_no,
    date_booked 
    model
    warranty
    engineer - configure this
    fault
    imei
    serial_number
    unit_status
    ticket_number - will be auto added (opposite for service order on the gspn)
    department - will be always be HHP
    job_added_by
    stores
    repeat_repair
    
    */
    return (
        <div>
            <form>
                <div className="mb-3">
                    <Label htmlFor="service_order_no">Service order</Label>
                    <Input type="text" name="service_order_no" />
                </div>
                <div className="mb-3">
                    <Label htmlFor="imei">IMEI</Label>
                    <Input type="text" name="imei" />
                </div>
                <div className="mb-3">
                    <Select name="warranty">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="warranty" />
                        </SelectTrigger>
                        <SelectContent>
                            {warranties.map((dep) => (
                                <SelectItem key={dep.id} value={`${dep.warranty}`}>{dep.warranty}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </form>
        </div>
    )
}

export default AddRepairshoprHHPTask
