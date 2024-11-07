export const menuItems = [
    {
        label: "HHP",
        sublinks: [
            {
                id: 1,
                item: "Technicians",
                pageRoute: "/departments/hhp/technicians",
            },
        ],
    },
    {
        label: "Booking agents report",
        sublinks: [
            { id: 3, item: "Analytics", pageRoute: "/booking_agents_report" },
        ],
    },
    {
        label: "Claims",
        sublinks: [
            { id: 4, item: "Add claim", pageRoute: "/departments/claims" },
        ],
    },
    {
        label: "Tookan",
        sublinks: [{ id: 5, item: "Add task", pageRoute: "/tookan" }],
    },
    {
        label: "Dashboard",
        sublinks: [{ id: 6, item: "Analytics", pageRoute: "/dashboard" }],
    },
    {
        label: "Driver app",
        sublinks: [
            { id: 7, item: "Checklists", pageRoute: "/drivers/checklists" },
        ],
    },
    {
        label: "Admin",
        sublinks: [
            { id: 8, item: "Add engineer", pageRoute: "/engineers" },
            { id: 9, item: "Add booking agent", pageRoute: "/agents" },
            { id: 10, item: "Add store", pageRoute: "/stores" },
            { id: 11, item: "Add driver", pageRoute: "/drivers" },
        ],
    },
];
