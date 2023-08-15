import Navbar from "../../../components/Navbar";
// Next auth session hook
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  BadgeDelta,
  Metric,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import BarChartAlltime from "../../../components/Graphs/BarChartAllTime";
import BarChartMonth from "../../../components/Graphs/BarChartMonth";
import BarChartToday from "../../../components/Graphs/BarChartToday";

export default function Dashboard() {
  // Google auth session
  const { data: session } = useSession();
  // console.log("Repo", repo);

  const [completeCountToday, setCompleteCountToday] = useState("");
  const [completeCount, setCompleteCount] = useState("");
  const [pendingCountToday, setPendingCountToday] = useState("");
  const [pendingCount, setPendingCount] = useState("");
  const [unitsInCountToday, setUnitsInCountToday] = useState("");
  const [unitsInCount, setUnitsInCount] = useState("");
  const [isQCChecked, setIsQCChecked] = useState("");
  const [isQCCheckedToday, setIsQCCheckedToday] = useState("");

  // Graph

  useEffect(() => {
    // Stats
    dashboardCountUnitsInToday();
    dashboardCountUnitsIn();
    dashboardCountUnitsPendingToday();
    dashboardCountUnitsPending();
    dashboardCountUnitsCompleteToday();
    dashboardCountUnitsComplete();
    qcCheckedUnits(), qcCheckedUnitsToday();
  }, [
    unitsInCountToday,
    unitsInCount,
    pendingCountToday,
    pendingCount,
    completeCount,
    completeCountToday,
    isQCChecked,
    isQCCheckedToday,
  ]);

  const dashboardCountUnitsInToday = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in/today`,

      {
        method: "GET",
        headers: { accept: "application/json" },
        cache: "default",
        next: { revalidate: 2 },
      }
    )
      .then((res) => res.json())
      .then((data) => setUnitsInCountToday(data.units_in_today));
  }, [unitsInCountToday]);

  const dashboardCountUnitsIn = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in`,
      {
        method: "GET",
        headers: { accept: "application/json" },
        cache: "default",
        next: { revalidate: 2 },
      }
    )
      .then((res) => res.json())
      .then((data) => setUnitsInCount(data.units_in));
  }, [unitsInCount]);

  const dashboardCountUnitsPendingToday = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending/today`,
      {
        method: "GET",
        headers: { accept: "application/json" },
        cache: "default",
        next: { revalidate: 2 },
      }
    )
      .then((res) => res.json())
      .then((data) => setPendingCountToday(data.pending_today));
  }, [pendingCountToday]);

  const dashboardCountUnitsPending = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending`,
      {
        method: "GET",
        headers: { accept: "application/json" },
        cache: "default",
        next: { revalidate: 2 },
      }
    )
      .then((res) => res.json())
      .then((data) => setPendingCount(data.pending));
  }, [pendingCount]);

  const dashboardCountUnitsComplete = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete`,
      {
        method: "GET",
        headers: { accept: "application/json" },
        cache: "default",
        next: { revalidate: 2 },
      }
    )
      .then((res) => res.json())
      .then((data) => setCompleteCount(data.complete));
  }, [completeCount]);

  const dashboardCountUnitsCompleteToday = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete/today`,
      {
        method: "GET",
        headers: { accept: "application/json" },
        cache: "default",
        next: { revalidate: 2 },
      }
    )
      .then((res) => res.json())
      .then((data) => setCompleteCountToday(data.complete_today));
  }, [completeCountToday]);

  // QC CHECKED
  const qcCheckedUnitsToday = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_QC_CHECKED}/today`, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "default",
      next: { revalidate: 2 },
    })
      .then((res) => res.json())
      .then((data) => setIsQCCheckedToday(data[0].qc_checked_today));
  };

  const qcCheckedUnits = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_QC_CHECKED}`, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "default",
      next: { revalidate: 2 },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsQCChecked(data[0].qc_checked);
      });
  }, [isQCChecked]);

  const router = useRouter();

  if (session) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="robots" content="noindex, nofollow"></meta>
        </Head>
        <Navbar />
        <main className="space-between-navbar-and-content">
          <section className="container max-w-6xl px-5 mx-auto pt-5 mb-28">
            <h1 className="mb-4  font-semibold font-sans leading-none tracking-tight text-gray-900 ">
              Analytics overview
            </h1>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 my-3 ">
              <article className=" flex flex-col justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
                <div className="first_row flex  justify-between items-center">
                  <div>
                    <Text className="text-sm text-gray-400  font-medium font-sans">
                      Units in
                    </Text>
                    <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {unitsInCount}
                    </Metric>
                  </div>
                  <ArrowUpTrayIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div className="second_row mt-3">
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="md"
                  >
                    <span>Today</span> {unitsInCountToday}
                  </BadgeDelta>
                </div>
              </article>
              <article className=" flex flex-col justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
                <div className="first_row flex  justify-between items-center">
                  <div>
                    <Text className="text-sm text-gray-400  font-medium font-sans">
                      Units pending
                    </Text>
                    <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {pendingCount}
                    </Metric>
                  </div>
                  <ArrowPathIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div className="second_row mt-3">
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="md"
                  >
                    <span>Today</span> {pendingCountToday}
                  </BadgeDelta>
                </div>
              </article>
              <article className=" flex flex-col justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
                <div className="first_row flex  justify-between items-center">
                  <div>
                    <Text className="text-sm text-gray-400  font-medium font-sans">
                      Units repair complete
                    </Text>
                    <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {completeCount}
                    </Metric>
                  </div>
                  <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div className="second_row mt-3">
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="md"
                  >
                    <span>Today</span> {completeCountToday}
                  </BadgeDelta>
                </div>
              </article>
              <article className="flex items-center justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
                <div>
                  <div className="text-sm text-gray-400  font-medium font-sans">
                    Engineers
                  </div>
                  <div className="flex items-center pt-1">
                    <div className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      6
                    </div>
                  </div>
                </div>
                <div>
                  <UserGroupIcon className="h-6 w-6 text-gray-500" />
                </div>
              </article>
              <article className=" flex flex-col justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
                <div className="first_row flex  justify-between items-center">
                  <div>
                    <Text className="text-sm text-gray-400  font-medium font-sans">
                      QC CHECKED
                    </Text>
                    <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {isQCChecked}
                    </Metric>
                  </div>
                  <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div className="second_row mt-3">
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="md"
                  >
                    <span>Today</span> {isQCCheckedToday}
                  </BadgeDelta>
                </div>
              </article>
            </div>
          </section>
          <section className="container mx-auto">
            <TabGroup>
              <TabList className="mt-8">
                <Tab>Today</Tab>
                <Tab>Month</Tab>
                <Tab>All time</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <BarChartToday />
                </TabPanel>
                <TabPanel>
                  <BarChartMonth />
                </TabPanel>
                <TabPanel>
                  <BarChartAlltime />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </section>
        </main>
      </>
    );
  }
}
