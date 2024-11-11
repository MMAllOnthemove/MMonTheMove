import React from 'react'

const ReportTableHead = () => {
    return (
        <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white  text-sm uppercase font-semibold">
            <tr className=" font-semibold">
                <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Booking Agent
                </th>
                <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Jobs booked
                </th>
            </tr>
        </thead>
    )
}

export default ReportTableHead