import {
    createColumnHelper
} from '@tanstack/react-table';
import { TColumns } from "./types";
const columnHelper = createColumnHelper<TColumns | any>();

const columns = [
    {
        header: "Date",
        accessorKey: "created_at",
    },
    {
        header: "Car",
        accessorKey: "car_name",
    },
    {
        header: "Receipt number",
        accessorKey: "receipt_number",
    },
    {
        header: "Odometer",
        accessorKey: "odometer",
    },
    {
        header: "Filled volume (L)",
        accessorKey: "filled_volume_litres",
    },
    {
        header: "Fuel price (R/L)",
        accessorKey: "fuel_price_per_litre",
    },
    {
        header: "100% filled?",
        accessorKey: "tank_filled",
        // cell: info => moment(info).format("YYYY-MM-DD")
    },
    columnHelper.group({
        id: "accumulated",
        header: () => <span>Accumulated</span>,
        columns: [
            columnHelper.accessor('km_travelled_from_last_refill', {
                cell: info => info.getValue(),
                header: () => <span>km</span>,
            }),
            columnHelper.accessor('litres_travelled_from_last_refill', {
                cell: info => info.getValue(),
                header: () => <span>L</span>,
            }),
        ],
    }),
    columnHelper.group({
        id: "accumulated",
        header: () => <span>Refill cost</span>,
        columns: [
            columnHelper.accessor('total_fill_cost', {
                cell: info => info.getValue(),
                header: () => <span>R</span>,
            }),
        ],
    }),
    columnHelper.group({
        id: "accumulated",
        header: () => <span>Consumption</span>,
        columns: [
            columnHelper.accessor('km_consumption_per_litre', {
                cell: info => info.getValue(),
                header: () => <span>km/L</span>,
            }),
            columnHelper.accessor('litres_consumption_per_100km', {
                cell: info => info.getValue(),
                header: () => <span>L/100km</span>,
            }),
            columnHelper.accessor('miles_gallon', {
                cell: info => info.getValue(),
                header: () => <span>miles/gallon</span>,
            }),
        ],
    }),
    columnHelper.group({
        id: "accumulated",
        header: () => <span>Cost of the km</span>,
        columns: [
            columnHelper.accessor('cost_of_the_km', {
                cell: info => info.getValue(),
                header: () => <span>R/km</span>,
            }),
        ],
    }),
];

export default columns;
