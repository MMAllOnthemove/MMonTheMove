import React, { useState } from 'react'

import { IHHPSingleTask } from "@/lib/types";

const UnitAssets = ({ data, id }: { data: IHHPSingleTask[], id: string }) => {
    const openTask = data.find((task) => task.id === id);


    const [model, setModel] = useState("")
    const [serial_number, setSerial] = useState("")
    const [imei, setIMEI] = useState("")
    const [asset_type, setCreateAssetType] = useState("")
    return (
        <div>UnitAssets</div>
    )
}

export default UnitAssets