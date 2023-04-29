import Image from 'next/image'

import Navbar from '../../components/Navbar'



export default function Home() {
  return (
    <>
      <header className="bg-white absolute inset-x-0 top-0 z-50">
        <Navbar />
      </header>

      <main>
        <h1 className="text-4xl text-green-500">The ultimate teams app</h1>
      </main>
    </>
  )
}
