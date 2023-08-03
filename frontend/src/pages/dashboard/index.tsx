import Navbar from "../../../components/Navbar";
// Next auth session hook
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Grid, Col, Card, Text, Metric } from "@tremor/react";

export default function Dashboard() {
  // Google auth session
  const { data: session } = useSession();

  const [completeCount, setCompleteCount] = useState("");
  const [pendingCount, setPendingCount] = useState("");
  const [unitsInCount, setUnitsInCount] = useState("");

  useEffect(() => {
    dashboardCountUnitsIn();
    dashboardCountUnitsPending();
    dashboardCountUnitsComplete();
  }, [unitsInCount, pendingCount, completeCount]);

  async function dashboardCountUnitsIn() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in`,
      {
        cache: "default",
        next: { revalidate: 2 },
      }
    );
    const json = await response.json();
    setUnitsInCount(json.units_in);
    // console.log("In", json);

    return json;
  }

  async function dashboardCountUnitsPending() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending`,
      {
        cache: "default",
        next: { revalidate: 2 },
      }
    );
    const json = await response.json();
    setPendingCount(json.pending);
    // console.log("Pending", json);

    return json;
  }

  async function dashboardCountUnitsComplete() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete`,
      {
        cache: "default",
        next: { revalidate: 2 },
      }
    );
    const json = await response.json();
    // console.log("Complete", json);

    setCompleteCount(json.complete);

    return json;
  }

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
          <div className="container max-w-6xl px-5 mx-auto pt-5 mb-28">
            <h1 className="mb-4 text-4xl font-semibold font-sans leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Analytics
            </h1>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3 ">
              <article
                className="flex items-center justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/units/in");
                }}
              >
                <div>
                  <Text className="text-sm text-gray-400  font-medium font-sans">
                    Units in
                  </Text>
                  <div className="flex items-center pt-1">
                    <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {unitsInCount}
                    </Metric>
                  </div>
                </div>
                <div>
                  <ArrowUpTrayIcon className="h-6 w-6 text-gray-500" />
                </div>
              </article>
              <article
                className="flex items-center justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/units/pending");
                }}
              >
                <div>
                  <div className="text-sm text-gray-400  font-medium font-sans">
                    Units pending
                  </div>
                  <div className="flex items-center pt-1">
                    <div className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {/* // Used the Number object because it returns blank instead
                      of zero */}
                      {pendingCount}
                    </div>
                  </div>
                </div>
                <div>
                  <ArrowPathIcon className="h-6 w-6 text-gray-500" />
                </div>
              </article>
              <article
                className="flex items-center justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/units/complete");
                }}
              >
                <div>
                  <div className="text-sm text-gray-400 font-medium font-sans">
                    Units repair complete
                  </div>
                  <div className="flex items-center pt-1">
                    <div className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                      {completeCount}
                    </div>
                  </div>
                </div>
                <div>
                  <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
                </div>
              </article>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3 ">
              <article className="flex items-center justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
                <div>
                  <div
                    className="text-sm text-gray-400  font-medium font-sans"
                    onClick={() => {
                      router.push("/dashboard/engineers");
                    }}
                  >
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
            </div>
          </div>
        </main>
      </>
    );
  }
}
