import isDateInRange from "./date_range";

// 1. Count of Repairs by Store
// You can count how many repairs were done at each store.
export function getRepairsByStore(
    repairs: any,
    startDate: string,
    endDate: string
) {
    return repairs.reduce((acc: any, repair: any) => {
        // If both dates are provided, filter by date range
        if (startDate && endDate) {
            if (isDateInRange(repair.date_booked, startDate, endDate)) {
                acc[repair.stores] = (acc[repair.stores] || 0) + 1;
            }
        }
        // If only one or neither date is provided, include all repairs
        else {
            acc[repair.stores] = (acc[repair.stores] || 0) + 1;
        }
        return acc;
    }, {});
}

// 2. Fault Frequency Analysis
// Identify the most common faults across all repairs.
export function getFrequentFaults(data: any[]) {
    return data.reduce((acc: any, repair: any) => {
        acc[repair.fault] = (acc[repair.fault] || 0) + 1;
        return acc;
    }, {});
}

// 3. Repairs by Engineer
// Count how many repairs each engineer has worked on.
export function getRepairByEngineer(data: any[]) {
    return data.reduce((acc: any, repair: any) => {
        acc[repair.engineer] = (acc[repair.engineer] || 0) + 1;
        return acc;
    }, {});
}

// 4. Average Time to Repair
// Calculate the average time from booking to completion (if completion dates are available).
interface RepairEntry {
    id: string;
    date_booked: string;
    completed_date?: string;
    // Add other fields if necessary
}

// used
export function calculateAverageRepairTime(data: RepairEntry) {
    let totalRepairTime = 0;
    let completedRepairs = 0;

    data?.forEach((entry) => {
        const { date_booked, completed_date } = entry;

        if (date_booked && completed_date) {
            const startDate = new Date(date_booked);
            const endDate = new Date(completed_date);
            const timeDifference = endDate.getTime() - startDate.getTime();

            if (timeDifference >= 0) {
                // Ensure valid dates
                const daysToRepair = timeDifference / (1000 * 60 * 60 * 24);
                totalRepairTime += daysToRepair;
                completedRepairs++;
            }
        }
    });

    return completedRepairs > 0
        ? (totalRepairTime / completedRepairs).toFixed(2)
        : 0;
}

// 6. Repair Trends Over Time
// You can analyze the number of repairs booked over time, e.g., monthly.
export function getUnitsBookedOverTime(data: any[]) {
    return data.reduce((acc, repair) => {
        const month = new Date(repair.date_booked).toISOString().slice(0, 7); // YYYY-MM
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
}

// 7. Repeat Repairs Analysis
// Count how many repairs were repeats versus first-time repairs.

export function getUnitsRepeatRepairAnalytics(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.repeat_repair] = (acc[repair.repeat_repair] || 0) + 1;
        return acc;
    }, {});
}

// 8. Warranty Status Breakdown
// Count how many repairs are under warranty vs. out of warranty.
export function getWarrantyStatusBreakdown(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.warranty] = (acc[repair.warranty] || 0) + 1;
        return acc;
    }, {});
}
// 9. Engineer Performance
// You can analyze which engineer has the most completed repairs.
export function getCompleteRepairsByEngineer(data: any[]) {
    return data.reduce((acc, repair) => {
        if (repair.completed_date) {
            acc[repair.engineer] = (acc[repair.engineer] || 0) + 1;
        }
        return acc;
    }, {});
}

// 10. Repair Completion Rate
// Calculate the percentage of repairs that are completed versus those that are not.
// used
export function getCompletionRate(data: any[]) {
    const totalRepairs = data?.length;
    const completedRepairs = data?.filter((r) => r.completed_date).length;
    const completionRate = (completedRepairs / totalRepairs) * 100;

    return completionRate.toFixed(2);
}

// 12. Fault Types by Engineer
// Analyze which faults are most commonly associated with each engineer.

export function getFaultTypesByEngineer(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.engineer] = acc[repair.engineer] || {};
        acc[repair.engineer][repair.fault] =
            (acc[repair.engineer][repair.fault] || 0) + 1;
        return acc;
    }, {});
}

// 13. Parts Pending Analysis
// Count how many repairs have pending parts versus those that don't.

export function getUnitsWithPendingParts(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.parts_pending ? "Pending" : "Not Pending"] =
            (acc[repair.parts_pending ? "Pending" : "Not Pending"] || 0) + 1;
        return acc;
    }, {});
}

// 14. Engineer's Repair Load
// Determine how many repairs each engineer has currently assigned.
export function getEngineerWithAssignedTasks(data: any[]) {
    return data.reduce((acc, repair) => {
        const yearMonth = new Date(repair.date_booked)
            .toISOString()
            .slice(0, 7); // YYYY-MM
        acc[yearMonth] = (acc[yearMonth] || 0) + 1;
        return acc;
    }, {});
}

// 15. Monthly Repair Trends
// Visualize the monthly trend of repairs over the years.

export function getUnitsBookedTrends(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.parts_pending ? "Pending" : "Not Pending"] =
            (acc[repair.parts_pending ? "Pending" : "Not Pending"] || 0) + 1;
        return acc;
    }, {});
}

// 16. Stores with Highest Repair Rates
// Identify which stores have the highest volume of repairs.

export function getStoreWithMostRepairRates(data: any[]) {
    const repairsByStoreVolume = data.reduce((acc, repair) => {
        acc[repair.stores] = (acc[repair.stores] || 0) + 1;
        return acc;
    }, {});

    const sortedStores = Object.entries(repairsByStoreVolume)
        .sort((a, b) => b[1] - a[1])
        .map(([store, volume]) => ({ store, volume }));
    return sortedStores;
}

// 17. Time to Repair Analysis by Fault
// Evaluate the average time taken to repair based on the fault type.

interface TcalculateAverageTimeToRepairByFault {
    fault: string;
    date_booked: string;
    completed_date?: string;
}
export function calculateAverageTimeToRepairByFault(
    repairs: TcalculateAverageTimeToRepairByFault[]
): {
    [fault: string]: string;
} {
    const timeToRepairByFault = repairs.reduce((acc, repair) => {
        if (repair.completed_date) {
            const bookedDate = new Date(repair.date_booked).getTime();
            const completedDate = new Date(repair.completed_date).getTime();
            const repairTime =
                (completedDate - bookedDate) / (1000 * 60 * 60 * 24); // in days

            acc[repair.fault] = acc[repair.fault] || { total: 0, count: 0 };
            acc[repair.fault].total += repairTime;
            acc[repair.fault].count++;
        }
        return acc;
    }, {} as { [fault: string]: { total: number; count: number } });

    return Object.fromEntries(
        Object.entries(timeToRepairByFault).map(([fault, { total, count }]) => [
            fault,
            (total / count).toFixed(2),
        ])
    );
}

// 19. Ticket Number Trends
// Analyze trends in ticket numbers to see if there are patterns over time.

export function getTicketNumberTrends(data: any[]) {
    return data.reduce((acc, repair) => {
        const month = new Date(repair.date_booked).toISOString().slice(0, 7); // YYYY-MM
        acc[month] = acc[month] || [];
        acc[month].push(repair.ticket_number);
        return acc;
    }, {});
}

// 22. Average Parts Pending Time
// Calculate the average time parts have been pending before being issued or ordered.

// used
export function getAveragePartsPendingTime(data: any[]) {
    const pendingPartsTime = data.reduce(
        (acc, repair) => {
            if (repair.parts_pending && repair.parts_pending_date) {
                const pendingDate = new Date(repair.updated_at).getTime(); // Using the most recent date
                const currentDate = new Date().getTime(); // Current date for comparison
                const timePending =
                    (currentDate - pendingDate) / (1000 * 60 * 60 * 24); // in days
                acc.total += timePending;
                acc.count++;
            }
            return acc;
        },
        { total: 0, count: 0 }
    );

    const averagePendingTime = pendingPartsTime.count
        ? (pendingPartsTime.total / pendingPartsTime.count).toFixed(2)
        : 0;

    return averagePendingTime;
}

// 23. Faults by Store Analysis
// Analyze which stores have the highest incidence of specific faults.

export function getFaultsByStore(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.stores] = acc[repair.stores] || {};
        acc[repair.stores][repair.fault] =
            (acc[repair.stores][repair.fault] || 0) + 1;
        return acc;
    }, {});
}

// 24. Unit Status Distribution
// Determine the distribution of different unit statuses across all repairs.
export function statusesFromBookedUnits(data: any[]) {
    return data.reduce((acc, repair) => {
        acc[repair.unit_status] = (acc[repair.unit_status] || 0) + 1;
        return acc;
    }, {});
}
// 27. Repair Time Analysis by Store
// Compare average repair times across different stores.
export function calculateAverageRepairTimeByStore(tasks, status = "complete") {
    const repairTimes = tasks.reduce((acc, repair) => {
        if (repair.completed_date) {
            const bookedDate = new Date(repair.date_booked);
            const completedDate = new Date(repair.completed_date);
            const repairTime =
                (completedDate - bookedDate) / (1000 * 60 * 60 * 24); // in days
            acc[repair.stores] = acc[repair.stores] || { total: 0, count: 0 };
            acc[repair.stores].total += repairTime;
            acc[repair.stores].count++;
        }
        return acc;
    }, {});

    const averageRepairTimeByStore = {};
    for (const store in repairTimeByStore) {
        averageRepairTimeByStore[store] = (
            repairTimeByStore[store].total / repairTimeByStore[store].count
        ).toFixed(2);
    }

    return averageRepairTimeByStore;
}

// 29. Parts Issue Rate
// Calculate the percentage of repairs that have issued parts.
export function partsIssuedRate(data: []) {
    const partsIssuedRate =
        (data.filter((r) => r.parts_issued).length / data.length) * 100;
    return partsIssuedRate || 0;
}
