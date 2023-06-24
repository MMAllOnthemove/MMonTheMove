import { Box, ThemeProvider, createTheme } from "@mui/material";
import {
  MaterialReactTable,
  MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

type EditData = {
  inHouseStatus: string;
  qualityControl: string;
  engineerAnalysis: string;
};

const Table = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<string[] | any[]>([]);
  const router = useRouter();

  const { id } = router.query;

  // Fetching info from our database
  const fetchDataFromDatabase = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTableData(data);
      });
  };
  useEffect(() => {
    fetchDataFromDatabase();
  }, [tableData]);

  //should be memoized or stable
  const defaultMaterialTheme = createTheme();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "service_order_no", //access nested data with dot notation
        header: "Service Order",
        enableClickToCopy: true,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "created_date", //access nested data with dot notation
        header: "Booking",
        enableClickToCopy: true,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "model", //normal accessorKey
        header: "Model",
        enableClickToCopy: true,
        enableEditing: false, //disable editing on this column
        enableSorting: true,
      },
      {
        accessorKey: "warranty",
        header: "Warranty",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "engineer",
        header: "Technician",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "fault",
        header: "Fault",
        enableClickToCopy: true,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "imei",
        header: "IMEI",
        enableClickToCopy: true,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "serial_number",
        header: "Serial Number",
        enableClickToCopy: true,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "in_house_status",
        header: "In-house status",
        enableEditing: true, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "quality_control",
        header: "Quality Control",
        enableEditing: true, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "engineer_assign_date",
        header: "Assessment Date",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "engineer_analysis",
        header: "Engineer Analysis",
        enableEditing: true, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "ticket_number",
        header: "Ticket Number",
        enableEditing: true, //enable editing on this column
        enableSorting: true,
      },
    ],
    []
  );
  const handleSaveRow: MaterialReactTableProps<any>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      // //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      // tableData[row.index] = values;
      // //send/receive api updates here
      tableData[row.index] = id;
      await fetch(`http://localhost:3001/management/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setTableData(data);
          exitEditingMode();
        });
    };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="row"
        enableEditing
        onEditingRowSave={handleSaveRow}
      />
    </ThemeProvider>
  );
};

export default Table;
