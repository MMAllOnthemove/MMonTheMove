import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserLoggedIn from '@/hooks/useGetUser'
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud'
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket'
import useSocket from '@/hooks/useSocket'
import useUpdateAssetRepairshopr from '@/hooks/useUpdateAssetRepairshopr'
import { IHHPSingleTask } from '@/lib/types'
import React, { useEffect, useState } from 'react'

type TAssets = {
    customer_id: number | null | undefined,
    asset_id: string | number | undefined,
    modelProp: string | undefined,
    serial_numberProp: string | undefined,
    imeiProp: string | undefined,
    data: IHHPSingleTask | null
}


const EditAssets = ({ asset_id, customer_id, modelProp, serial_numberProp, imeiProp, data }: TAssets) => {
    const { updateAssetRepairshopr, updateAssetRepairshoprLoading } = useUpdateAssetRepairshopr()
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { socket, isConnected } = useSocket()
    const [imei, setIMEI] = useState<string | undefined>("")
    const [serialNumber, setSerialNumber] = useState<string | undefined>("")
    const [model, setModel] = useState<string | undefined>("")
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateAssets, updateAssetsLoading } = useHHPTasksCrud()
    useEffect(() => {
        if (asset_id) {
            setIMEI(imeiProp)
            setSerialNumber(serial_numberProp)
            setModel(modelProp)
        }


    }, [asset_id, modelProp, serial_numberProp, imeiProp])

    // get asset id
    // because if user is editing, the asset exists
    // editing the asset, will thereby edit any ticket that uses said asset id
    // this will update the assets fine on rs, but then we will need to trigger an update on the ticket to target the imei property if it was changed, rs sucks!
    // afterwards, send the imei, model and serial number to the backend

    const triggerTicketUpdate = async (imei: string | undefined) => {
        const ticket_type_id_update = {
            // "user_id": data?.repairshopr_id,
            "status": data?.unit_status,
            "properties": {
                "IMEI": imei,
                "Warranty": data?.rs_warranty,
                "Warranty ": data?.rs_warranty,
                "Backup Requires": data?.requires_backup,
                "Backup Requires ": data?.requires_backup,
                "Item Condition": data?.accessories_and_condition,
                "Item Condition ": data?.accessories_and_condition,
                "Service Order No.": data?.service_order_no,
                "Service Order No. ": data?.service_order_no,
                "Special Requirement": data?.additional_info,
                "Special Requirement ": data?.additional_info,
                "Job Repair No.": data?.job_repair_no,
                "Job Repair No.:": data?.job_repair_no,
                "Location (BIN)": data?.device_location,
                "ticket_type_id": data?.ticket_type_id,
            }
        }
        if (data?.repairshopr_job_id) await updateRepairTicket(data?.repairshopr_job_id, ticket_type_id_update);
    }

    const submitEdit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const payload = {
            asset_type_name: "HHP",
            // asset_type_id: asset_id, // do not know what this is but it works without it
            properties: {
                "Model No.:": model,
                "IMEI No.": imei,
            },
            name: model,
            customer_id: customer_id,
            asset_serial: serialNumber,
        };
        const response = await updateAssetRepairshopr(asset_id, payload)
        const updateAssetsLocallyPayload = {
            imei: response?.data?.asset?.properties["IMEI No."], serial_number: response?.data?.asset?.asset_serial, model: response?.data?.asset?.properties["Model No.:"], ticket_number: data?.ticket_number, updated_by: user?.email
        }
        if (response?.status === 200) {
            await triggerTicketUpdate(response?.data?.asset?.properties["IMEI No."]) //  always set these in case user modifies any
            await updateAssets(data?.id, updateAssetsLocallyPayload)
            window?.location?.reload()
        }

    }
    return (
        <form>
            <h2>Edit assets</h2>
            <div className="mb-3">
                <Label htmlFor="imei">IMEI</Label>
                <Input type="text" name="imei" value={imei || ''} onChange={(e) => setIMEI(e.target.value)} />
            </div>
            <div className="mb-3">
                <Label htmlFor="serialNumber">Serial number</Label>
                <Input type="text" name="serialNumber" value={serialNumber || ''} onChange={(e) => setSerialNumber(e.target.value)} />
            </div>
            <div className="mb-3">
                <Label htmlFor="model">Model number</Label>
                <Input type="text" name="model" value={model || ''} onChange={(e) => setModel(e.target.value)} />
            </div>
            <Button type="submit" onClick={submitEdit} disabled={updateAssetRepairshoprLoading}>{updateAssetRepairshoprLoading ? 'Udpating asset' : 'Edit asset'}</Button>
        </form>
    )
}

export default EditAssets