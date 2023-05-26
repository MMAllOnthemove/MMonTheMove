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
  parts_issued: string;
  parts_ordered: string;
};

const Table = () => {
  const [tableData, setTableData] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/management")
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        setLoading(false);
      });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!tableData) return <p>No profile data</p>;

  //should be memoized or stable
  const defaultMaterialTheme = createTheme();
  const columns = useMemo(
    () => [
      {
        accessorKey: "service_order", //access nested data with dot notation
        header: "Service Order",
      },
      {
        accessorKey: "warranty",
        header: "Warranty",
      },
      {
        accessorKey: "model", //normal accessorKey
        header: "Model",
      },
      {
        accessorKey: "IMEI",
        header: "Imei",
      },
      {
        accessorKey: "serial_number",
        header: "Serial Number",
      },
      {
        accessorKey: "engineer",
        header: "Engineer",
      },
      {
        accessorKey: "parts_issued",
        header: "Parts issued",
      },
      {
        accessorKey: "parts_ordered",
        header: "Parts ordered",
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
