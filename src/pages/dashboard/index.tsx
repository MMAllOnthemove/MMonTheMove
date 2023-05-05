import { Tab } from '@headlessui/react'
import { useState } from 'react'
import AnalyticCard from '../../../components/AnalyticCard'
import Navbar from '../../../components/Navbar'

interface Props {
    props: any;
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Dashboard() {
    let [categories] = useState({
        Graph_View: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Table_View: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        Board_View: [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    })
    return (
        <>
            <Navbar />
            <main>
                <div className="container mx-auto p-4">
                    <section className="flex justify-between items-center my-5">
                        <h1 className="text-4xl font-bold text-gray-700">Dashboard</h1>
                        {/* <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Options
                                    <ChevronDownIcon
                                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    {active ? (
                                                        <EditActiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <EditInactiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    Edit
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    {active ? (
                                                        <DuplicateActiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <DuplicateInactiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    Duplicate
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    {active ? (
                                                        <ArchiveActiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <ArchiveInactiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    Archive
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    {active ? (
                                                        <MoveActiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <MoveInactiveIcon
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    Move
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    {active ? (
                                                        <DeleteActiveIcon
                                                            className="mr-2 h-5 w-5 text-violet-400"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <DeleteInactiveIcon
                                                            className="mr-2 h-5 w-5 text-violet-400"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu> */}
                    </section>

                    <section className='analytics_cards'>
                        <AnalyticCard />
                    </section>
                    <section>
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
                    </section>
                </div>
            </main>
        </>
    )
}


export default Dashboard
