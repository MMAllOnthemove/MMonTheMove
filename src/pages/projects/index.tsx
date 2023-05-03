import React from 'react'
import Navbar from '../../../components/Navbar'
import InputField from '../../../components/InputField'
import { tableRowData } from '../../../public/_data/table'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { EditInactiveIcon, EditActiveIcon, DuplicateInactiveIcon, DuplicateActiveIcon, ArchiveInactiveIcon, ArchiveActiveIcon, MoveInactiveIcon, MoveActiveIcon, DeleteInactiveIcon, DeleteActiveIcon } from '../../../components/Functions'
import SortableTable from '../../../components/SortableTable'

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}
export default function Projects() {
  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="flex justify-between items-center my-5">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-700">Projects</h1>
            <span className="dropdowns flex gap-2 items-center ">
              {/* <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Table View
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
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-1">
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
              </Menu>
              <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Recent
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
            </span>
          </section>
          <section className="my-4">
            <InputField className="searchInput input" name="search" type="search" placeholder="Search here" />
          </section>
          <section className="w-full overflow-auto">
            <SortableTable tableRowData={tableRowData}/>
          </section>
        </div>
      </main>
    </>
  )
}
