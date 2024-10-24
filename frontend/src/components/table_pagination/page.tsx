import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IPaginationProps {
    table: any;
}

const Pagination = ({ table }: IPaginationProps) => {
    return (
        <div className="pagination flex flex-wrap gap-2 p-2 justify-between items-center rounded-lg shadow-sm">
            <div className="flex gap-2 md:flex-1">
                <Button
                    role="button"
                    className="border rounded p-1 font-medium disabled:opacity-50 md:hidden"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    &laquo;
                </Button>
                <Button
                    role="button"
                    className="border rounded p-1 font-medium disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    &lsaquo;
                </Button>
                <Button
                    role="button"
                    className="border rounded p-1 font-medium disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    &rsaquo;
                </Button>
                <Button
                    role="button"
                    className="border rounded p-1 font-medium disabled:opacity-50 md:block hidden"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    &raquo;
                </Button>
            </div>

            <div className="flex items-center gap-2 md:flex-1">
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                    Page
                </span>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </strong>
            </div>

            <div className="flex items-center gap-2 md:flex-1">
                <span className="sr-only">Go to page:</span>
                <Input
                    id="search-page-number"
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        table.setPageIndex(page);
                    }}
                    className="w-16 border rounded p-1 bg-gray-50 border-gray-300 text-gray-900"
                />
            </div>

            <div className="flex items-center gap-2 md:flex-1">
                <label htmlFor="showPageSize" className="sr-only">
                    Show Page Size
                </label>
                <select
                    id="showPageSize"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="border rounded p-1 bg-gray-50 border-gray-300 text-gray-900 cursor-pointer"
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination;