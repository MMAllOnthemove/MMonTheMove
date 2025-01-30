import SearchCustomerRepairshoprCustomerScreen from '@/components/screens/bookings/customers/search_customer/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bookings | search",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
};
const SearchCustomerRepairshopr = () => {
    return (
        <SearchCustomerRepairshoprCustomerScreen />
    )
}

export default SearchCustomerRepairshopr