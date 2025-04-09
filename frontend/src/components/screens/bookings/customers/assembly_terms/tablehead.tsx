import {
    flexRender,
    HeaderGroup,
} from "@tanstack/react-table"


type TTableHead = {
    table: {
        getHeaderGroups: () => HeaderGroup<any>[]

    }
}
const TableHead = ({ table }: TTableHead) => {
    return (
        <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white uppercase font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className=" font-semibold">
                    <th className="px-4 py-3 cursor-pointer  font-semibold">
                        Action
                    </th>

                    {headerGroup.headers.map((header) => {
                        return (
                            <th
                                key={header.id}
                                className="px-4 py-3 cursor-pointer  font-semibold"
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? "cursor-pointer select-none"
                                                : "",
                                            onClick:
                                                header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: " 👇",
                                            desc: " 👆",
                                        }[header.column.getIsSorted() as string] ??
                                            null}
                                    </div>
                                )}
                            </th>
                        );
                    })}
                </tr>
            ))}
        </thead>
    )
}

export default TableHead