import { useState, useEffect } from "react";
import axios from "axios";
import { Customer } from "@/lib/types";

type TSearchCustomer = {
    id: number | string;
    firstname: string;
    lastname: string;
    fullname: string;
    business_name: string;
    email: string;
    phone: string;
    mobile: string | null | undefined;
    created_at: string;
    updated_at: string;
    address: string;
    address_2: string;
    city: string;
    state: string;
    zip: string;
};

const useFetchCustomer = () => {
    const [customerSearchLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState<{}>();

    const checkIfCustomerWasHere = async (searchQuery: string | null) => {
        const trimmedSearch = searchQuery?.trim();
        if (!trimmedSearch) return;

        setIsLoading(true);

        try {
            const { data } = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/customers?query=${trimmedSearch}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            const exactMatchCustomer = findExactMatchCustomer(
                data.customers,
                trimmedSearch
            );

            if (exactMatchCustomer) {
                setCustomer(exactMatchCustomer);
            } else {
                setCustomer([]); // No exact match found
            }

            return exactMatchCustomer; // Return the exact match customer
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching customer data:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const findExactMatchCustomer = (
        customers: TSearchCustomer[],
        searchQuery: string
    ) => {
        const searchLower = searchQuery.toLowerCase();

        return customers.find((customer) => {
            const matches = [
                customer.firstname?.toLowerCase() === searchLower,
                customer.lastname?.toLowerCase() === searchLower,
                customer.email?.toLowerCase() === searchLower,
                `${customer.firstname} ${customer.lastname}`?.toLowerCase() ===
                    searchLower,
                customer.mobile?.toLowerCase() === searchLower,
                customer.phone?.toLowerCase() === searchLower,
            ];

            return matches.some((match) => match);
        });
    };

    return { customerSearchLoading, customer, checkIfCustomerWasHere };
};

export default useFetchCustomer;
