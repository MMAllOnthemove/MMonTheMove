"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchAssets } from "@/hooks/useCheckCustomerAssets";
import useGetCustomerLocally from "@/hooks/useGetCustomerLocally";
import { asset_names } from '@/lib/asset_names';
import { useStoreAvailableAssetsLocalStorage, useStoreCreatedAssetsToLocalStorage } from "@/hooks/useStoreCustomerAssetsToLocalStorage";
import dynamic from 'next/dynamic';
import { useCreateAssets } from "@/hooks/useCreateCustomerAssets";
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const RepairshoprAssetScreen = () => {
    // const [searchAssets, setSearchAssets] = useState("");
    const [selectedAsset, setSelectedAsset] = useState("")
    // const [result, setResult] = useState<any>([]);
    // const [createAssetLoading, setCreateAssetLoading] = useState(false)
    const params = useParams()
    const { customer_email } = params;
    const { singleCustomer, singleCustomerLoading, refetch } = useGetCustomerLocally(
        decodeURIComponent(Array.isArray(customer_email) ? customer_email[0] : customer_email)
    );
    const id = singleCustomer[0]?.repairshopr_customer_id
    const customerEmail = singleCustomer[0]?.email || ""

    // creating asset
    const [createModel, setCreateModel] = useState("")
    const [createSerial, setCreateSerial] = useState("")
    const [createIMEI, setCreateIMEI] = useState("")
    const [createAssetType, setCreateAssetType] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()
    // Hooks
    const { searchAssets, setSearchAssets, result, loadingAssets } = useSearchAssets(id);
    const { storeAvailableAssetsLocalStorage } = useStoreAvailableAssetsLocalStorage()
    const { storeNewAssetsToLocalStorage } = useStoreCreatedAssetsToLocalStorage()
    const { createAssetsOnRepairshopr, createAssetLoading } = useCreateAssets()


    const storeAssetsLocally = () => {
        const assetInfo = {
            "asset_id": selectedAsset,
            "asset_serial": result[0]?.asset_serial,
            "model_number": result[0]?.properties["Model No.:"]
        }
        storeAvailableAssetsLocalStorage("assetInfo", assetInfo, `/bookings/staff/create_ticket/rs/${encodeURIComponent(customerEmail)}`)
    }

    const createAssetsOnRS = async () => {
        const values = {
            "asset_type_name": createAssetType,
            "properties": {
                "IMEI No.": createIMEI,
                "Model No.:": createModel
            },
            "name": createModel,
            "customer_id": id,
            "asset_serial": createSerial
        }


        const assetId = await createAssetsOnRepairshopr(customerEmail, values)
        const assetInfo = {
            "asset_id": assetId,
            "asset_serial": createSerial,
            "asset_imei": createIMEI,
            "model_number": createModel
        }

        storeNewAssetsToLocalStorage("assetInfo", assetInfo, `/bookings/staff/create_ticket/rs/${encodeURIComponent(customerEmail)}`);
    }


    return (
        <>

            <div className="flex flex-col justify-center items-center h-screen bg-white border w-30">
                <Sidebar />
                <h4 className="text-3xl font-bold mb-2 text-center dark:text-gray-700">Search asset</h4>
                <p className='tracking-tighter text-gray-500 md:text-lg dark:text-gray-400'>Serial number</p>
                <p className='tracking-tighter text-gray-500 text-sm mb-2'>{loadingAssets ? 'Searching...' : null}</p>
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

                            <>
                                <Select

                                    value={selectedAsset}
                                    onValueChange={(e) => setSelectedAsset(e)}
                                    name='selectedAsset'
                                >
                                    <SelectTrigger className="w-[180px] border ml-0 flex justify-center mx-auto mb-3 text-sm">
                                        <SelectValue placeholder="Select existing asset" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Customer assets</SelectLabel>
                                            <SelectItem key={x?.id} value={`${x.id}`}>{x?.asset_serial} - {x?.name}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Button type="button" onClick={storeAssetsLocally}>Add asset to ticket</Button>
                            </>


                        ))
                    ) : null
                }

                {searchAssets !== result[0]?.asset_serial || result[0]?.asset_serial === "" || searchAssets === "" ?
                    <>
                        <p className="my-2 text-sm font-medium text-slate-800">Nothing showing? click here to create asset</p>
                        <Button type="button" onClick={() => setOpenModal(true)}>Create new asset</Button>

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
                                        <Button type="button" onClick={createAssetsOnRS} disabled={createAssetLoading}>{createAssetLoading ? 'Creating...' : 'Create new asset'}</Button>
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