import { ISearchForm } from "../../../utils/interfaces";

const ManagementSearchForm = ({ filtering, setFiltering }: ISearchForm) => {
  return (
    <form className="flex items-center" id="management-search-form">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 dark:bg-[#22303C] border border-gray-300 text-gray-900 dark:text-[#eee] text-sm rounded-lg focus:outline-none focus:border-primary-500 block w-full pl-10 p-2"
          placeholder="Search"
          maxLength={10}
          value={filtering}
          onChange={setFiltering}
        />
      </div>
    </form>
  );
};

export default ManagementSearchForm;
