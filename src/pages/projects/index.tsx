import React from 'react'
import Navbar from '../../../components/Navbar'
import InputField from '../../../components/InputField'
import { tableData } from '../../../public/_data/table'

export default function Projects() {
  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="my-4">
            <h1 className="text-5xl font-semibold">Projects</h1>
          </section>
          <section className="my-4">
            <InputField className="searchInput input" name="search" type="search" placeholder="Search here" />
          </section>
          <section className="w-full overflow-x-auto">
            <table className="mt-4 border-collapse table-auto">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="text-gray-800 font-sans font-semibold text-center">Unit Model</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Unit Problem</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Category</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Date Assessed</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Assessment Completion</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Repair Date</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Repair Completed</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Status</th>
                  <th className="text-gray-800 font-sans font-semibold text-center">Technician</th>
                </tr>
              </thead>
              <tbody>
                {
                  tableData.map((item) => (
                    <tr key={item.id}>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.model}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.problem}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.category}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.assessDate}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.assessComplete}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.repairDate}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.repairComplete}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.status}</td>
                      <td className="text-gray-800 font-sans font-normal text-center">{item.tech}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </>
  )
}
