"use client"
import { useState } from "react";
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useHHPTasks from '@/hooks/useHHPTasks';
import useFetchEngineer from "@/hooks/useFetchEngineers";

const HHPDashboardTable = () => {
    const [selectedEngineer, setSelectedEngineer] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const { hhpTasks } = useHHPTasks();
    const { engineersList } = useFetchEngineer();

    const hhpTechs = engineersList?.filter((x) => x.department === 'HHP');
    const engineerLookup = new Set(hhpTechs.map(e => `${e.engineer_firstname} ${e.engineer_lastname}`));

    const isInDateRange = (date: string) => {
        if (!fromDate && !toDate) return true;
        const jobDate = moment(date);
        return jobDate.isBetween(moment(fromDate).startOf("day"), moment(toDate).endOf("day"), null, "[]");
    };

    // Filter jobs based on engineers and date range, plus qc_complete filter
    const filteredJobs = hhpTasks.filter((job: any) =>
        engineerLookup.has(job.engineer) &&
        isInDateRange(job.date_booked) &&
        job.qc_complete === "Pass" // Make sure only "Pass" jobs are included
    );

    // Group by engineer and calculate completed units
    const engineers = filteredJobs.reduce((acc: any, job: any) => {
        const engineer = acc.find((e: any) => e.engineer === job.engineer);
        if (engineer) {
            engineer.tickets.push(job);
            engineer.completed_units++; // Only increase completed_units if "Pass"
        } else {
            acc.push({
                engineer: job.engineer,
                completed_units: 1, // First "Pass" job increases completed_units
                tickets: [job],
            });
        }
        return acc;
    }, []);

    const totalCompleted = engineers.reduce((sum: any, e: any) => sum + e.completed_units, 0);

    // Sort engineers by completed units in descending order
    const sortedEngineers = engineers.sort((a: any, b: any) => b.completed_units - a.completed_units);


    return (
        <>
            <div className="p-4">
                {/* Filters */}
                <div className="flex gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium">From Date</label>
                        <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">To Date</label>
                        <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                    <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                        <caption>HHP tasks completed</caption>
                        <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Engineer</th>
                                <th className="px-4 py-3 font-semibold">Completed Units</th>
                            </tr>
                        </thead>
                        <tbody className="z-0">
                            {sortedEngineers.map((engineer: any) => (
                                <Dialog key={engineer.engineer}>
                                    <DialogTrigger asChild>
                                        <TableRow
                                            onClick={() => setSelectedEngineer(engineer)}
                                            className="cursor-pointer hover:bg-gray-100"
                                        >
                                            <TableCell>{engineer.engineer}</TableCell>
                                            <TableCell>{engineer.completed_units}</TableCell>
                                        </TableRow>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <div className="h-[400px] overflow-auto">
                                            <h2 className="text-lg font-semibold">{engineer.engineer}'s Tickets</h2>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>#</TableHead>
                                                        <TableHead>Ticket Number</TableHead>
                                                        <TableHead>Date Booked</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {engineer.tickets
                                                        .filter((ticket: any) => isInDateRange(ticket.date_booked)) // Only filter by date
                                                        .map((ticket: any, index: number) => (
                                                            <TableRow key={ticket.ticket_number}>
                                                                <TableCell>{index + 1}</TableCell>
                                                                <TableCell>{ticket.ticket_number}</TableCell>
                                                                <TableCell>{moment(ticket.date_booked).format("YYYY-MM-DD HH:mm")}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="px-4 py-3 font-semibold">Total</td>
                                <td className="px-4 py-3 font-semibold">{totalCompleted}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}

export default HHPDashboardTable;
