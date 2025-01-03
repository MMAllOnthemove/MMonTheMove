export const menuItems = [
    {
        label: "Technicians",
        sublinks: [
            {
                id: 1,
                item: "HHP",
                pageRoute: "/departments/hhp/technicians",
            },
            {
                id: 2,
                item: "DTV/HA",
                pageRoute: "/departments/dtv_ha/technicians",
            },
        ],
    },
    {
        label: "Booking agents stats",
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
        ],
    },
    {
        label: "Bookings",
        sublinks: [
            // { id: 16, item: "Create customer", pageRoute: "/create_customer" },
            { id: 16, item: "Create customer", pageRoute: "/welcome" },
        ],
    },
    {
        label: "Customer list",
        sublinks: [{ id: 17, item: "Customers", pageRoute: "/customers" }],
    },
];
