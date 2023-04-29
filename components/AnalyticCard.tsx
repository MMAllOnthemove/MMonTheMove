import React from 'react'
import { analytic } from '../public/_data/analytics'

function AnalyticCard() {
  return (
    <>

      {
        analytic.map((item) => (
          <article className='bg-white rounded-md border-2 h-full shadow-md p-5 flex justify-between flex-col gap-2 text-center' key={item.id}>
            <h4 className="capitalize font-sans text-5xl font-extrabold text-gray-900">{item.stat}</h4>
            <p className="capitalize font-sans text-xl font-normal text-gray-600">{item.title}</p>
          </article>
        ))
      }

    </>
  )
}

export default AnalyticCard
