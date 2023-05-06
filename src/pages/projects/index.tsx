import Navbar from '../../../components/Navbar'
import SortableTable from '../../../components/SortableTable'
import { tableRowData } from '../../../public/_data/table'


export default function Projects() {
  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="flex justify-center my-5">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-700">Projects HHP - DTV - HA</h1>
         
          </section>
          <section className="my-4">
            <label htmlFor="search" className="sr-only">Search here</label>
            <input className='input' type="text" name="search" id="search" />
          </section>
          <section className="w-full overflow-auto">
            <SortableTable tableRowData={tableRowData}/>
          </section>
        </div>
      </main>
    </>
  )
}
