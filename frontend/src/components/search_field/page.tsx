import { ISearchForm } from "@/lib/interfaces";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";


const ManagementSearchForm = ({ filtering, setFiltering }: ISearchForm) => {
    return (
        <div className="relative">
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <Input
                type="text"
                id="simple-search"
                placeholder="Search..."
                className="placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm pl-10 pr-4 py-2 shadow-none border border-gray-200 rounded-md focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
                value={filtering}
                onChange={(e) => setFiltering(e)}
            />
        </div>
    );
};

export default ManagementSearchForm;