// External imports
import {
    fetchCurrentUser,
    fetchIPAASSoInfolIST,
} from "@/hooks/useFetch";
import dynamic from "next/dynamic";

import { useMemo, useState } from "react";

import moment from "moment";

import DashboardCard from "@/components/DashboardCard";
import PageTitle from "@/components/PageTitle";
import ToTopButton from "@/components/ToTopButton";
import Link from "next/link";
import Modal from "@/components/PopupModal";
import Container from "@/components/Container";
const Pagination = dynamic(() => import("@/components/Table/Pagination"));







function Dashboard() {
    const { userData } = fetchCurrentUser();
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [department, setDepartment] = useState("")




    let momentFormattedDate = moment(dateFrom).format("YYYYMMDD")

    const { findAllJobsGSPN } = fetchIPAASSoInfolIST(momentFormattedDate);

    // Get today's date
    const today = new Date();

    // Calculate the minimum date (3 months back)
    const minDate = new Date(today);
    minDate.setMonth(today.getMonth() - 3);

    // Format the dates to 'YYYY-MM-DD'
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    // const filteredData = useMemo(() => {
    //     return findAllJobsGSPN?.filter(item => {
    //         const matchesDepartment = department?.length > 0 && department === item.SvcProduct;
    //         const matchesDate = momentFormattedDate && item.ReqDate === momentFormattedDate;
    //         if (department) return matchesDepartment;
    //         if (matchesDate) return matchesDate;
    //         if (department?.length > 0 && momentFormattedDate) return matchesDepartment && matchesDate;

    //     });
    // }, [department, momentFormattedDate, findAllJobsGSPN]);

    const filteredData = findAllJobsGSPN?.filter(item => {
        // return (!momentFormattedDate || item.ReqDate === momentFormattedDate) && (!department || item.SvcProduct === department);

        const itemDate = moment(item.ReqDate)?.format("YYYYMMDD")

        const endDate = moment(dateTo).format("YYYYMMDD")
        const isWithinDateRange =
            (!momentFormattedDate || itemDate >= momentFormattedDate) &&
            (!endDate || itemDate <= endDate);
        const departmentMatch = !department || item.SvcProduct === department;
        return isWithinDateRange && departmentMatch;
    })
    // useMemo(() => console.log(filteredData?.filter(item => item.WarrantyType === "I" && item.SvcProduct === "HHP")), [momentFormattedDate, department, dateTo])
    const inWarrantyCount = useMemo(() => filteredData?.filter(item => item.WarrantyType === "I").length, [filteredData]);
    const outOfWarrantyCount = useMemo(() => filteredData?.filter(item => item.WarrantyType === 'O').length, [filteredData])
    const pendingCount = useMemo(() => filteredData?.filter(item => item.StatusDesc === "Pending").length, [filteredData])
    const completedCount = useMemo(() => filteredData?.filter(item => item.StatusDesc === "Completed" || item.StatusDesc === "Complete").length, [filteredData])
    const goodsDeliveredCount = useMemo(() => filteredData?.filter(item => item.StatusDesc === "Goods Delivered").length, [filteredData])




    const items = [
        { title: 'In warranty', count: 10 },
        { title: 'Out of warranty', count: 20 },
        { title: 'Pending', count: 30 },
        { title: 'Completed', count: 40 },
        { title: 'Goods delivered', count: 50 },
    ];



    const [showModal, setShowModal] = useState<boolean | null | any>()
    const [selectedCard, setSelectedCard] = useState(null);
    const openModal = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    // console.log(compressedString);  // Output: "a2b1c5a3"

    return (
        <Container>

            <PageTitle title="Dashboard" hasSpan={true} spanText={"GSPN"} />
            <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
                The stats here are only gspn based, for {" "}
                <Link
                    href="/dashboard/rs"
                    className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                    Repairshopr
                </Link>
            </p>
            <div className="flex justify-between items-center">
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

                        <option value={`HHP`}>
                            HHP
                        </option>
                        <option value={`VDE`}>
                            TVs
                        </option>
                        <option value={`REF`}>
                            Fridges
                        </option>
                        <option value={`WSM`}>
                            Washing machines
                        </option>
                        <option value={`HKE`}>
                            Home kitchen electronics (dishwashers etc.)
                        </option>
                        <option value={`MON`}>
                            Monitors
                        </option>
                    </select>
                </span>
            </div>
            {/* {filteredData?.map((x) => (
            <p key={x?.SvcOrderNo}>{x?.SvcOrderNo} - {x?.SvcProduct} -  {x?.EngineerName}</p>
          ))} */}

            {/* 
          
          - in warranty
          - out of warranty
          - pending
          - completed
          - goods delivered

        //   On click

        -  service order
        - engineer
        - department
        - fault
        - imei
        - serial number
        - model number
          
          
          
          
          */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">

                <DashboardCard title='In warranty' paragraph={inWarrantyCount} />
                <DashboardCard title='Out warranty' paragraph={outOfWarrantyCount} />
                <DashboardCard title='Pending' paragraph={pendingCount} />
                <DashboardCard title='Completed' paragraph={completedCount} />
                <DashboardCard title='Goods delivered' paragraph={goodsDeliveredCount} />

                {/* <Modal
                    isVisible={openModal}
                    title={""}
                    content={<>

                        {countPending}


                    </>}
                    onClose={closeModal}
                /> */}

            </div>
            <ToTopButton />

        </Container>
    );
}


export default Dashboard;
