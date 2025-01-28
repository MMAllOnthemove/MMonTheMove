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
        label: "Bookings",
        sublinks: [
            // { id: 16, item: "Create customer", pageRoute: "/create_customer" },
            { id: 15, item: "Create customer", pageRoute: "/welcome" },
            {
                id: 16,
                item: "Book from SO",
                pageRoute: "/departments/hhp/book_from_so",
            },
            {
                id: 17,
                item: "Check warranty",
                pageRoute: "/check_warranty",
            },
            {
                id: 18,
                item: "Add files to ticket",
                pageRoute: "/attachments_ticket",
            },
        ],
    },
    {
        label: "Customers",
        sublinks: [
            {
                id: 19,
                item: "Today's customers",
                pageRoute: "/customers_today",
            },
            { id: 20, item: "Customers list", pageRoute: "/customers" },
        ],
    },
];
