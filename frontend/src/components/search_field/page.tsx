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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filtering}
                onChange={(e) => setFiltering(e)}
            />
        </div>
    );
};

export default ManagementSearchForm;