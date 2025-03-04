export const menuItems = [
    // {
    //     label: "Technicians",
    //     sublinks: [
    //         {
    //             id: 1,
    //             item: "HHP",
    //             pageRoute: "/departments/hhp/technicians",
    //         },
    //         {
    //             id: 2,
    //             item: "DTV/HA",
    //             pageRoute: "/departments/dtv_ha/technicians",
    //         },
    //     ],
    // },
    {
        label: "Claims",
        sublinks: [
            { id: 3, item: "Add claim", pageRoute: "/departments/claims" },
        ],
    },
    {
        label: "Tookan",
        sublinks: [{ id: 4, item: "Add task", pageRoute: "/tookan" }],
    },
    {
        label: "Dashboard",
        sublinks: [
            { id: 5, item: "HHP stats", pageRoute: "/dashboard" },
            {
                id: 6,
                item: "Booking agents stats",
                pageRoute: "/booking_agents_report",
            },
        ],
    },
    {
        label: "Driver app",
        sublinks: [
            { id: 7, item: "Checklists", pageRoute: "/drivers/checklists" },
            {
                id: 8,
                item: "Fuel consumption",
                pageRoute: "/drivers/fuel_consumption",
            },
        ],
    },
    {
        label: "Admin",
        sublinks: [
            { id: 9, item: "Add engineer", pageRoute: "/engineers" },
            { id: 10, item: "Add booking agent", pageRoute: "/agents" },
            { id: 11, item: "Add store", pageRoute: "/stores" },
            { id: 12, item: "Add driver", pageRoute: "/drivers" },
            { id: 13, item: "Add car", pageRoute: "/cars" },
            { id: 14, item: "Add assembly term", pageRoute: "/assembly_terms" },
        ],
    },
    {
        label: "Bookings staff",
        sublinks: [
            {
                id: 15,
                item: "Create customer",
                pageRoute: "/bookings/staff/create_customer",
            },
            {
                id: 16,
                item: "Search customer",
                pageRoute: "/bookings/staff/search_customer",
            },
            {
                id: 17,
                item: "Today's customers",
                pageRoute: "/bookings/staff/customers_today",
            },
            {
                id: 18,
                item: "Book from SO",
                pageRoute: "/bookings/staff/book_from_so",
            },
            {
                id: 19,
                item: "Warranty check",
                pageRoute: "/bookings/staff/check_warranty",
            },
            {
                id: 20,
                item: "View ticket",
                pageRoute: "/bookings/staff/view_ticket",
            },
            {
                id: 21,
                item: "All customers",
                pageRoute: "/bookings/staff/customers",
            },
            // {
            //     id: 22,
            //     item: "Robtronics/Dunoworx booking",
            //     pageRoute: "/bookings/staff/dunoworx_robtronics",
            // },
        ],
    },
    {
        label: "Bookings customers",
        sublinks: [
            {
                id: 23,
                item: "Begin process",
                pageRoute: "/bookings/customers/welcome",
            },
        ],
    },
];
