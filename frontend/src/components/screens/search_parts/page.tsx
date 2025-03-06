"use client"
import useUserLoggedIn from '@/hooks/useGetUser'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useIpaasSOPartsInfo from '@/hooks/useIpaasGetSOPartsInfo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import useIpaasGetBranchStockOverview from '@/hooks/useGetBranchStockOverview'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)

const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)

type TPartsResult = {
    "PartsNo": string,
    "Division": string,
    "DivisionDesc": string,
    "PartsDescription": string,
    "SalesStatus": string,
    "StockAvalability": string,
    "UnitPrice": string | number,
    "Currency": string,
    "Color": string | null,
    "DivisionName": string,
    "RetailPrice": string | null,
    "ASCPrice": string | null,
    "CoreAPrice": string | null,
    "CoreBPrice": string | null

}
const SearchPartsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { getSOPartsInfo, loadingPartInfo } = useIpaasSOPartsInfo()
    const { getBranchStockOverview, stockOverviewListLoading } = useIpaasGetBranchStockOverview()
    const [search_part, setSearchPart] = useState("")
    const [part_in_stock, setInStock] = useState<string | undefined>("")
    const [result, setResult] = useState<TPartsResult | undefined>()
    // search parts from ipaas

    const handleGetSOPartInfo = async (search_part: string) => {
        if (!search_part) return;
        try {
            const [data, stock] = await Promise.all([
                getSOPartsInfo(search_part),
                getBranchStockOverview(search_part),
            ]);

            setResult(data?.Return?.EsPartsInfo)
            setInStock(stock)
            // setPartName(data?.Return?.EsPartsInfo?.PartsNo)
            // setPartDesc(data?.Return?.EsPartsInfo?.PartsDescription)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error)
            }
        }
    };


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="Part" hasSpan={true} spanText={"Search"} />
                            <div className='mx-auto flex w-full max-w-[300px] gap-3'>
                                <Input type="search" name="search" placeholder='Search part' value={search_part} onChange={(e) => setSearchPart(e.target.value)} />
                                <Button type="button" disabled={loadingPartInfo} onClick={() => handleGetSOPartInfo(search_part)}>{loadingPartInfo ? 'Searching...' : 'Search'}</Button>
                            </div>

                            <Card className="mt-3">
                                <CardHeader>
                                    <CardTitle>Search part</CardTitle>
                                    <CardDescription>
                                        Search using the part name
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3>Part number</h3>
                                        <h3>{result?.PartsNo}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3>Parts description</h3>
                                        <h3>{result?.PartsDescription}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3>SalesStatus</h3>
                                        <h3>{result?.SalesStatus}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3>StockAvalability</h3>
                                        <h3>{result?.StockAvalability}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3>UnitPrice</h3>
                                        <h3>{result?.UnitPrice}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3>RetailPrice</h3>
                                        <h3>{result?.RetailPrice}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3>In stock</h3>
                                        <h3>{part_in_stock}</h3>
                                    </div>
                                </CardContent>
                            </Card>

                        </main>
                    </>


                ) : (
                    <NotLoggedInScreen />
                )
            }


        </>
    )
}

export default SearchPartsScreen