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
import {
  Grid,
  Col,
  Card,
  Text,
  Metric,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
  Badge,
  BarList,
  Flex,
  Bold,
  BarChart,
  Subtitle,
  Select,
  SelectItem,
  AreaChart,
} from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("rsa").format(number).toString();
};

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
          <section className="container max-w-6xl px-5 mx-auto pt-5 mb-28">
            <h1 className="mb-4  font-semibold font-sans leading-none tracking-tight text-gray-900 dark:text-white">
              Analytics overview
            </h1>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 my-3 ">
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
          </section>
          <section className="container mx-auto">
            <h3>All time engineer records</h3>
            <p>Dropdown with, today, week, month, year</p>
            <p>
              Clicking on dropdown renders the ui with the graph for that
              particular time period
            </p>
            <p>Create component file with each time period</p>
            <p>State is boolean type</p>

            <Card>
              <Title>Newsletter revenue over time (USD)</Title>
              <AreaChart
                className="h-72 mt-4"
                data={chartdata}
                index="date"
                categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                colors={["indigo", "cyan"]}
                valueFormatter={dataFormatter}
              />
            </Card>
          </section>
        </main>
      </>
    );
  }
}
