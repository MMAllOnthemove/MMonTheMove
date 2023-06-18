import { Tab } from "@headlessui/react";
import { useState } from "react";
import AnalyticCard from "../../../components/AnalyticCard";
import Navbar from "../../../components/Navbar";

interface Props {
  props: any;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  let [categories] = useState({
    Graph_View: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Table_View: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Board_View: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto p-4">
          <section className="flex justify-between items-center my-5">
            <h1 className="text-4xl font-bold text-gray-700">Dashboard</h1>
          </section>

          <section className="analytics_cards">
            <AnalyticCard />
          </section>
          {/* <section>
                        <div className="w-full max-w-full px-2 py-16 sm:px-0">
                            <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-md font-medium leading-5 text-gray-700',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-white shadow border'
                                                    : 'text-blue-100 font-bold hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        Table View
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-white shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        Board View
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-white shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        Graph View
                                    </Tab>

                                </Tab.List>
                                <Tab.Panels className="mt-2">

                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-xl bg-white p-3',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        Content 1
                                    </Tab.Panel>
                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-xl bg-white p-3',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        Content 2
                                    </Tab.Panel>
                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-xl bg-white p-3',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        Content 3
                                    </Tab.Panel>

                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </section> */}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
