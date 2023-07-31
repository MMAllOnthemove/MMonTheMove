import Navbar from "../../../components/Navbar";
// Next auth session hook
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
// Tanstack table
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "../../../components/table/dashboardTableColumns";

function Dashboard() {
  // Google auth session
  const { data: session } = useSession();

  const [completeCount, setCompleteCount] = useState("");
  const [pendingCount, setPendingCount] = useState("");
  const [inCount, setInCount] = useState("");

  useEffect(() => {
    dashboardCountUnitsIn();
    dashboardCountUnitsPending();
    dashboardCountUnitsComplete();
  }, []);

  async function dashboardCountUnitsIn() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in`,
      {
        cache: "default",
        next: { revalidate: 2 }, // refetch every 3 seconds
      }
    );
    const json = await response.json();
    setInCount(json[0].units_in);
    return json;
  }
  async function dashboardCountUnitsPending() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending`,
      {
        cache: "default",
        next: { revalidate: 2 }, // refetch every 3 seconds
      }
    );
    const json = await response.json();
    setPendingCount(json[0].pending);
    return json;
  }
  async function dashboardCountUnitsComplete() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete`,
      {
        cache: "default",
        next: { revalidate: 2 }, // refetch every 3 seconds
      }
    );
    const json = await response.json();
    setCompleteCount(json[0].complete);
    return json;
  }

  // Table sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // Table filtering
  const [filtering, setFiltering] = useState("");
  // Table contents
  // const memoizedData = useMemo(() => tableData, []);
  // console.log(memoizedData);

  if (session) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="robots" content="noindex, nofollow"></meta>
        </Head>
        <Navbar />
        <main>
          <h1 className="font-sans text-xl md:text-3xl lg:text-4xl text-slate-800 font-bold text-center">
            Dashboard
          </h1>
          <section className="container mx-auto">
            <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
              <div className="sm:flex sm:space-x-4">
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-md font-sans leading-6 font-semibold text-gray-800 uppercase">
                          Units In
                        </h3>
                        <p className="text-4xl font-sans font-bold text-sky-600">
                          {inCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-md font-sans leading-6 font-semibold text-gray-800 uppercase">
                          In progress
                        </h3>
                        <p className="text-4xl font-sans font-bold text-sky-600">
                          {pendingCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-md font-sans leading-6 font-semibold text-gray-800 uppercase">
                          Complete
                        </h3>
                        <p className="text-4xl font-sans font-bold text-sky-600">
                          {completeCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
                {/* This card is static until an engineers table is created */}
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-md font-sans leading-6 font-semibold text-gray-800 uppercase">
                          Engineers
                        </h3>
                        <p className="text-4xl font-sans font-bold text-sky-600">
                          6
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Dashboard;
