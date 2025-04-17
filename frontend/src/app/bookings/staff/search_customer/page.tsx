import SearchCustomerRepairshoprScreen from '@/components/screens/bookings/staff/search_customer/rs/page';
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
        <SearchCustomerRepairshoprScreen />
    )
}

export default SearchCustomerRepairshopr