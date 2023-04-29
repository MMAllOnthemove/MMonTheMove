import Image from 'next/image'
// import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'

// const inter = Inter({ subsets: ['latin'] })

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
