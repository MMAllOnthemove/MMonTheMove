"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { asset_names } from '@/lib/asset_names';
import { Input } from '@/components/ui/input';

const RepairshoprAssetScreen = () => {
    const [searchAssets, setSearchAssets] = useState("");
    const [customerId, setCustomerId] = useState("")
    const [selectedAsset, setSelectedAsset] = useState("")
    const [result, setResult] = useState<any>([]);
    const [createAssetLoading, setCreateAssetLoading] = useState(false)

    // creating asset
    const [createModel, setCreateModel] = useState("")
    const [createSerial, setCreateSerial] = useState("")
    const [createIMEI, setCreateIMEI] = useState("")
    const [createAssetType, setCreateAssetType] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const loadCustomerInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('custInfo') || '""');
                // console.log(parsedData)
                if (parsedData !== null) {
                    setCustomerId(parsedData?.customerId)
                }
            }
        };
        loadCustomerInfo()
    }, [])

    // Check if the customer has booked this unit before
    useEffect(() => {
        const checkIfCustomerHasAssets = async () => {
            if (!searchAssets || !customerId) return; // Avoid unnecessary calls

            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}?query=${searchAssets}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`
                    },
                })
                // Filter assets based on the current customer's ID
                const filteredAssets = data?.assets.filter(
                    (asset: any) => asset.customer_id == customerId
                );
                setResult(filteredAssets || [])
            } catch (error) {
                if (process.env.NODE_ENV !== 'production')
                    console.error("search repair customer error", error)
            }

        }
        const delayDebounce = setTimeout(() => {
            if (searchAssets) {
                checkIfCustomerHasAssets()
            }
        }, 300); // Debounce delay

        return () => clearTimeout(delayDebounce);
    }, [searchAssets, customerId])

    // Store assets which exist under the customer, in localstorage
    const storeAvailableAssetsToLocalStorage = async () => {
        const assetInfo = {
            "asset_id": selectedAsset,
            "asset_serial": result[0]?.asset_serial,
            "model_number": result[0]?.properties["Model No.:"]
        }
        // console.log(assetInfo)
        const custAssetString = JSON.stringify(assetInfo);
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem("assetInfo", custAssetString);
            toast.success(`Assets created, Continue`);
            router.push("/create_ticket/rs")
            // console.log('Dummy object stored successfully!');
        }
    }

    // Create assets anew and store them to localstorage
    const storeCreatedAssetsToLocalStorage = async (assetId: string | number) => {
        const assetInfo = {
            "asset_id": assetId,
            "asset_serial": createSerial,
            "asset_imei": createIMEI,
            "model_number": createModel
        }
        // console.log(assetInfo)

        const custAssetString = JSON.stringify(assetInfo);
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem("assetInfo", custAssetString);
            router.push("/create_ticket/rs")
            // console.log('Dummy object stored successfully!');
        }

    }
    // Add the unit to repairshopr under the customer id or customer
    const storeCreatedAssetsToRepairshpr = async () => {
        const values = {
            "asset_type_name": createAssetType,
            "properties": {
                "IMEI No.": createIMEI,
                "Model No.:": createModel
            },
            "name": createModel,
            "customer_id": customerId,
            "asset_serial": createSerial
        }
        console.log(values)
        setCreateAssetLoading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`
                }
            })
            if (data) {
                const assetId = data?.asset?.id;
                storeCreatedAssetsToLocalStorage(assetId);

                toast.success(`Assets created, Continue`);
                router.push("/create_ticket/rs")
            }
        } catch (error: any) {
            console.log("create asset on rs error", error)
            toast.error(`${error?.response.data.message[0]}`);
        } finally {
            setCreateAssetLoading(false)
        }

    }
    return (
        <>

            <div className="flex flex-col justify-center items-center h-screen bg-white border w-30">
                <h4 className="text-3xl font-bold mb-2 text-center dark:text-gray-700">Search asset</h4>
                <p className='tracking-tighter text-gray-500 md:text-lg dark:text-gray-400'>Serial number</p>
                <div>
                    <Input
                        value={searchAssets}
                        onChange={(e) => setSearchAssets(e.target.value)}
                        autoComplete='false'
                        type="text"
                        placeholder="Search..."
                        className="w-full py-3 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none text-sm"
                    />
                </div>
                {
                    result?.length > 0 ? (
                        result.map((x: any) => (
                            <div className='mb-4 flex flex-col justify-center mx-auto' key={x?.asset_serial}>
                                <Label htmlFor='selectedAsset' className='sr-only'>Select asset</Label>
                                <Select
                                    value={selectedAsset}
                                    onValueChange={(e) => setSelectedAsset(e)}
                                    name='selectedAsset'
                                >
                                    <SelectTrigger className="w-full border ml-0 flex justify-center mx-auto mb-3">
                                        <SelectValue placeholder="Choose asset" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={`${x.id}`}>{x?.asset_serial} - {x?.name}</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button type="button" onClick={storeAvailableAssetsToLocalStorage}>Add asset</Button>
                            </div>

                        ))
                    ) : null
                }

                {searchAssets !== result[0]?.asset_serial || result[0]?.asset_serial === "" || searchAssets === "" ?
                    <>
                        <p className="my-2 text-sm font-medium text-slate-800">Nothing showing? Create it</p>
                        <Button type="button" onClick={() => setOpenModal(true)}>Create</Button>

                        {
                            openModal &&
                            <Dialog open={openModal} onOpenChange={() => setOpenModal(false)} >
                                {/* <DialogTrigger>Open</DialogTrigger> */}
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Use the serial number</DialogTitle>
                                        <DialogDescription>
                                            This will show assets under this customer
                                        </DialogDescription>
                                    </DialogHeader>
                                    <>
                                        <div className='mb-1'>
                                            <Input
                                                value={createIMEI}
                                                onChange={(e) => setCreateIMEI(e.target.value)}
                                                autoComplete='false'
                                                type="text"
                                                placeholder="Type IMEI"
                                            />
                                        </div>
                                        <div className='mb-1'>
                                            <Input
                                                value={createModel}
                                                onChange={(e) => setCreateModel(e.target.value)}
                                                autoComplete='false'
                                                type="text"
                                                placeholder="Type model number"
                                            />
                                        </div>
                                        <div className='mb-1'>
                                            <Input
                                                value={createSerial}
                                                onChange={(e) => setCreateSerial(e.target.value)}
                                                autoComplete='false'
                                                type="text"
                                                placeholder="Type serial number"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor='createAssetType' className='sr-only'>Asset type</label>
                                            <Select
                                                value={createAssetType}
                                                onValueChange={(e) => setCreateAssetType(e)}
                                                name='createAssetType'
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Create asset type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {asset_names.map((x: any) => (
                                                        <SelectItem key={x.id} value={`${x._name}`}>{x?._name}</SelectItem>

                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button type="button" onClick={storeCreatedAssetsToRepairshpr} disabled={createAssetLoading}>{createAssetLoading ? 'Creating...' : 'Create asset'}</Button>
                                    </>
                                </DialogContent>
                            </Dialog>
                        }
                    </>
                    : null}
            </div>
        </>
    )
}

export default RepairshoprAssetScreen