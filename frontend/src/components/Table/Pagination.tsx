import React from "react";

interface Itable {
  table: any;
}
function Pagination(props: Itable) {
  return (
    <div className="pagination flex gap-1 p-2">
      <button
        role="button"
        className="border rounded p-1 font-sans font-medium page-index-button hidden md:visible"
        onClick={() => props.table.setPageIndex(0)}
        disabled={!props.table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        role="button"
        className="border rounded p-1 font-sans font-medium"
        onClick={() => props.table.previousPage()}
        disabled={!props.table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        role="button"
        className="border rounded p-1 font-sans font-medium"
        onClick={() => props.table.nextPage()}
        disabled={!props.table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        role="button"
        className="border rounded p-1 font-sans font-medium page-index-button hidden md:visible"
        onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
        disabled={!props.table.getCanNextPage()}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div className="font-sans font-semibold text-[#0d0d0d]">Page</div>
        <strong>
          {props.table.getState().pagination.pageIndex + 1} of{" "}
          {props.table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1 font-sans">
        | Go to page:
        <label htmlFor="search-page-number" className="sr-only">
          {" "}
          Go to page:
        </label>
        <input
          id="search-page-number"
          name="search-page-number"
          type="number"
          defaultValue={props.table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            props.table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <label htmlFor="showPageSize" className="sr-only">
        Show Page Size
      </label>
      <select
        id="showPageSize"
        name="showPageSize"
        value={props.table.getState().pagination.pageSize}
        className="border border-[#eee] outline-none ring-0 font-sans font-medium cursor-pointer"
        onChange={(e) => {
          props.table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Pagination;
