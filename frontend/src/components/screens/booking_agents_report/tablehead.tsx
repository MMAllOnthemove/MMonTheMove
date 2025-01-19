import React from 'react'

const TableHead = () => {
    return (
        <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
            <tr className=" font-semibold">
                <th className="px-4 py-3 cursor-pointer font-semibold">
                    Ticket number
                </th>
                <th className="px-4 py-3 cursor-pointer font-semibold">
                    Agent
                </th>
                <th className="px-4 py-3 cursor-pointer font-semibold">
                    Action
                </th>
            </tr>
        </thead>
    )
}

export default TableHead