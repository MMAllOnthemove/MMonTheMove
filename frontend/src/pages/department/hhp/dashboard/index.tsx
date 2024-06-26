// External imports
import {
  countEngineerRepairCompleteAlltimeJobs,
  fetchCurrentUser,
  fetchTableData,
} from "@/hooks/useFetch";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
const DashboardStatCards = dynamic(
  () => import("@/components/DashboardStatCards")
);
const NotLoggedIn = dynamic(() => import("@/components/NotLoggedIn"));

function Dashboard() {
  const { userData } = fetchCurrentUser();
  const { hhpData } = fetchTableData();
  const { engineerUnitsAdded } = countEngineerRepairCompleteAlltimeJobs();
  const router = useRouter();
  const getEngineers = hhpData
    .flat()
    .filter(
      (obj, index) =>
        hhpData.flat().findIndex((item) => item.engineer === obj.engineer) ===
        index
    ).length;

  const getPendingJobs = hhpData.filter(
    (item) => item.in_house_status !== "Repair complete"
  ).length;

  const getQCChecked = hhpData.filter(
    (item) => item.is_qc_checked === "TRUE" || item.is_qc_checked === "true"
  ).length;

  // Sort the count descending
  engineerUnitsAdded.sort((a, b) => b - a);
  return (
    <>
      <Head>
        <title>HHP Dashboard</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        {!userData ? (
          <NotLoggedIn />
        ) : (
          <>
            <section className="container max-w-6xl px-5 mx-auto pt-5 mb-28">
              <h1 className="mb-4 text-4xl font-semibold leading-none text-center tracking-tight text-gray-900 dark:text-[#eee] md:text-5xl lg:text-6xl">
                Analytics overview
              </h1>
              <div className="bg-white p-4 flex items-center flex-wrap dark:bg-[#15202B] dark:border dark:border-[#eee]">
                <nav aria-label="breadcrumb">
                  <ol className="flex leading-none text-blue-500 divide-x">
                    <li className="pr-4">
                      <Link
                        href="/department/hhp/dashboard"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-5 h-auto fill-current mx-2 text-gray-400 dark:text-[#eee]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#000000"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                        </svg>
                      </Link>
                    </li>

                    <li
                      className="inline-flex items-center px-4 text-gray-700 "
                      aria-current="page"
                    >
                      <Link
                        href="/department/hhp/dashboard/units/pending"
                        className="text-gray-600 hover:text-blue-500 dark:text-[#eee]"
                      >
                        Units pending
                      </Link>
                    </li>

                    <li
                      className="inline-flex items-center px-4 text-gray-700"
                      aria-current="page"
                    >
                      <Link
                        href="/department/hhp/dashboard/engineers"
                        className="text-gray-600 hover:text-blue-500 dark:text-[#eee]"
                      >
                        Engineers
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
                <DashboardStatCards
                  title="Units pending"
                  stat={getPendingJobs}
                  onClick={() =>
                    router.push("/department/hhp/dashboard/units/pending")
                  }
                />
                <DashboardStatCards
                  title="Engineers"
                  stat={getEngineers}
                  onClick={() =>
                    router.push("/department/hhp/dashboard/engineers")
                  }
                />
                <DashboardStatCards title="QC CHECKED" stat={getQCChecked} />
              </div>
            </section>
            <section className="container mx-auto">
              <div className="max-h-[540px] overflow-y-auto">
                <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-[#eee] table-auto">
                  <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white  text-sm uppercase font-semibold">
                    <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                      <td className="px-4 py-3  font-medium text-sm max-w-full">
                        Engineer
                      </td>
                      <td className="px-4 py-3  font-medium text-sm max-w-full">
                        Jobs complete
                      </td>
                    </tr>
                  </thead>
                  <tbody className="z-0">
                    {engineerUnitsAdded.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                      >
                        <td className="px-4 py-3  font-medium text-sm max-w-full">
                          {item?.engineer}
                        </td>
                        <td className="px-4 py-3  font-medium text-sm max-w-full">
                          {item?.units_added}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
