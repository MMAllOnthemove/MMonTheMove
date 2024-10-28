export const menuItems = [
    {
        label: "HHP",
        sublinks: [
            {
                id: 1,
                item: "Technicians",
                pageRoute: "/departments/hhp/technicians",
            },
            {
                id: 2,
                item: "Dashboard",
                pageRoute: "/departments/hhp/analytics",
            },
            {
                id: 3,
                item: "Booking agents",
                pageRoute: "/departments/hhp/booking_agents",
            },
        ],
    },
    {
        label: "Claims",
        sublinks: [
            { id: 4, item: "Add task", pageRoute: "/departments/hhp/add" },
        ],
    },
    {
        label: "Tookan",
        sublinks: [{ id: 5, item: "Add task", pageRoute: "/tookan" }],
    },
    {
        label: "Admin",
        sublinks: [
            { id: 7, item: "Add engineer", pageRoute: "/engineers" },
            { id: 8, item: "Add booking agent", pageRoute: "/agents" },
            { id: 9, item: "Add store", pageRoute: "/stores" },
        ],
    },
];
