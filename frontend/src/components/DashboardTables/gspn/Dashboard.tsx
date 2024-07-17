import Container from "@/components/Container";
import DashboardCard from "@/components/DashboardCard";
import PageTitle from "@/components/PageTitle";
import { fetchCurrentUser, fetchIPAASSoInfolIST } from "@/hooks/useFetch";
import { BarChart, LineChart } from "@tremor/react";
import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";

import ToTopButton from "@/components/ToTopButton";
import Modal from "@/components/PopupModal";
import NotLoggedIn from "@/components/NotLoggedIn";
import { gspnDeps } from "../../../../utils/gspn_departments";


function Dashboard() {
    const { userData } = fetchCurrentUser();
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [department, setDepartment] = useState("")
    let momentFormattedDate = moment(dateFrom).format("YYYYMMDD")

    const { findAllJobsGSPN } = fetchIPAASSoInfolIST(momentFormattedDate);

    const [isModalOpen, setIsModalOpen] = useState<null | boolean | any>()



    // Get today's date
    const today = new Date();

    // Calculate the minimum date (3 months back)
    const minDate = new Date(today);
    minDate.setMonth(today.getMonth() - 3);

    // Format the dates to 'YYYY-MM-DD'
    const formatDate = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const filteredData = findAllJobsGSPN?.filter((item: any) => {

        const itemDate = moment(item.ReqDate)?.format("YYYYMMDD")

        const endDate = moment(dateTo).format("YYYYMMDD")

        const isWithinDateRange =
            (!momentFormattedDate || itemDate >= momentFormattedDate) &&
            (!endDate || itemDate <= endDate);
        const departmentMatch = !department || item.SvcProduct === department;

        return isWithinDateRange && departmentMatch;
    })


    // Getting the data for when a card is clicked
    const totalForThatDayDisplay = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.SvcOrderNo);
        else return []
    }, [filteredData]);
    const assignedToServiceCenter = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Assigned to Service Center");
        else return []

    }, [filteredData])
    const acknowledgedCount = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Acknowledged by ASC")
        else return []
    }, [filteredData])
    const pendingCount = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Pending");
        else return []
    }, [filteredData])
    const completedCount = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Repair Completed");
        else return []
    }, [filteredData])
    const cancelledCount = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Cancelled by ASC");
        else return []
    }, [filteredData])
    const engineerAssignedCount = useMemo(() => {
        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Engineer Assigned");
        else return []
    }, [filteredData])
    const goodsDeliveredCount = useMemo(() => {

        if (filteredData) return filteredData?.filter((item: any) => item.StatusDesc === "Goods Delivered")
        else return []
    }, [filteredData])


    // Using the data above and creating an array of objects for the card info
    const displayCards = [{
        id: 1,
        title: "Total Jobs",
        value: totalForThatDayDisplay.length,
        details: totalForThatDayDisplay

    }, {
        id: 2,
        title: "Assigned to Service Center",
        value: assignedToServiceCenter.length,
        details: assignedToServiceCenter

    }, {
        id: 3,
        title: "Acknowledged by ASC",
        value: acknowledgedCount.length,
        details: acknowledgedCount

    }, {
        id: 4,
        title: "Pending",
        value: pendingCount.length,
        details: pendingCount

    }, {
        id: 5,
        title: "Repair Completed",
        value: completedCount.length,
        details: completedCount

    }, {
        id: 6,
        title: "Cancelled by ASC",
        value: cancelledCount.length,
        details: cancelledCount

    }, {
        id: 7,
        title: "Engineer Assigned",
        value: engineerAssignedCount.length,
        details: engineerAssignedCount

    }, {
        id: 8,
        title: "Goods Delivered",
        value: goodsDeliveredCount.length,
        details: goodsDeliveredCount

    }];



    const handleCardClick = (row: any) => {
        setIsModalOpen(row);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    return (
        <Container>

            <PageTitle title="Dashboard" hasSpan={true} spanText={"GSPN"} />
            {!userData ? (
                <NotLoggedIn />
            ) : (
                <>
                    {/* <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
                        The stats here are only gspn based, for {" "}
                        <Link
                            href="/dashboard/rs"
                            className="text-blue-600 hover:text-blue-500 font-semibold"
                        >
                            Repairshopr
                        </Link>
                    </p> */}
                    {/* Date range and departments filter */}
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <span>
                                <label htmlFor="dateFrom" className="sr-only">
                                    Date from
                                </label>
                                <input
                                    type="date"
                                    name="dateFrom"
                                    min={formatDate(minDate)}
                                    max={formatDate(today)}
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] dark:accent-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    id="dateFrom"
                                />
                            </span>
                            <span>
                                <label htmlFor="dateTo" className="sr-only">
                                    Date To
                                </label>
                                <input
                                    type="date"
                                    name="dateTo"
                                    min={formatDate(minDate)}
                                    max={formatDate(today)}
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] dark:accent-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    id="dateTo"
                                />
                            </span>
                        </div>
                        <span>
                            <label
                                htmlFor="engineerFilter"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee] sr-only"
                            >
                                department filter
                            </label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                id="department"
                                className="mb-2 bg-white border cursor-pointer border-gray-300 outline-0 dark:bg-[#22303C] dark:text-[#eee] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option disabled value="">
                                    Filter by department
                                </option>
                                {gspnDeps.map((i) => (
                                    <option key={i.id} value={i.departmentCode}>
                                        {i.departmentName}
                                    </option>
                                ))}

                            </select>
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {
                            displayCards.map((card) => (
                                <DashboardCard
                                    onClick={() => handleCardClick(card)}
                                    key={card.id}
                                    title={card.title}
                                    paragraph={card.value}
                                />
                            ))
                        }
                    </div>

                    {/* Open this modal upon card click, it will open the card details matching specific card */}
                    <Modal title="" isVisible={isModalOpen} onClose={closeModal} content={<>

                        {isModalOpen && (

                            <div className="p-3 flex flex-col gap-2">
                                {isModalOpen?.details?.map((i: any) => (
                                    <div key={i?.SvcOrderNo} className="border-b">
                                        <p>SvcOrderNo: {i?.SvcOrderNo}</p>
                                        <p>Date: {moment(i.ReqDate).format('YYYY-MM-DD')}</p>
                                        <p>SvcProduct: {i.SvcProduct}</p>
                                        <p>Status: {i.StatusDesc}</p>
                                        <p>Model: {i.Model}</p>
                                    </div>
                                ))}
                                {/* <p>{isModalOpen?.details}</p> */}
                            </div>

                        )}

                    </>} />

                    {/* To top button */}
                    <ToTopButton />
                </>
            )}
        </Container>
    );
}


export default Dashboard;
