import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";

type ApiResponse = {
  data: Array<Table>;
};

type Table = {
  service_order: string;
  warranty: string;
  model: string;
  fault: string;
  imei: string;
  serial_number: string;
  engineer: string;
  parts_ordered: string;
  parts_issued: string;
};

const Table = () => {
  const [tableData, setTableData] = useState<Table[]>([]);
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/management`);
      const json = (await response.json()) as ApiResponse;
      // console.log(json);

      setTableData(json.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //should be memoized or stable
  const defaultMaterialTheme = createTheme();
  const columns = useMemo<MRT_ColumnDef<Table>[]>(
    () => [
      {
        accessorKey: "service_order", //access nested data with dot notation
        header: "Service Order",
      },
      {
        accessorKey: "warranty", //normal accessorKey
        header: "Warranty",
      },
      {
        accessorKey: "model",
        header: "Model",
      },

      {
        accessorKey: "fault",
        header: "Fault",
      },
      {
        accessorKey: "imei",
        header: "IMEI",
      },
      {
        accessorKey: "serial_number",
        header: "Serial No.",
      },
      {
        accessorKey: "engineer",
        header: "Engineer",
      },
      {
        accessorKey: "parts_ordered",
        header: "Parts Ordered",
      },
      {
        accessorKey: "parts_issued",
        header: "Parts Issued",
      },
    ],

    []
  );

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialReactTable columns={columns} data={tableData} />
    </ThemeProvider>
  );
};

export default Table;
