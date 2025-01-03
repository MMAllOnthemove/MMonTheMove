import { ChartConfig } from "@/components/ui/chart";

export const repairByStoreChartConfig = {
    count: {
        label: "Units booked",
        color: "red",
    },
    label: {
        color: "black",
    },
} satisfies ChartConfig;
export const warrantyBreakdownChartConfig = {
    count: {
        label: "Units booked",
        color: "#fb8500",
    },
    label: {
        color: "#212529",
    },
} satisfies ChartConfig;
export const unitsBookedInMonthlyChartConfig = {
    count: {
        label: "Units booked",
        color: "#fb8500",
    },
    label: {
        color: "#212529",
    },
} satisfies ChartConfig;
