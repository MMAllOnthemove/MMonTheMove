import React from 'react'

const ReportTableHead = () => {
    return (
        <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white text-xs uppercase font-medium">
            <tr className="font-semibold">
                <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Booking Agent
                </th>
                <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Tickets booked
                </th>
                <th className="px-4 py-3 cursor-pointer  font-semibold">
                    IW
                </th>
                <th className="px-4 py-3 cursor-pointer  font-semibold">
                    OW
                </th>
            </tr>
        </thead>
    )
}

export default ReportTableHead