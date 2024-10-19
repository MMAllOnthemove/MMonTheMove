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
            {
                id: 3,
                item: "Add tasks",
                pageRoute: "/departments/hhp/add",
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
        sublinks: [{ id: 6, item: "Add task", pageRoute: "" }],
    },
];
