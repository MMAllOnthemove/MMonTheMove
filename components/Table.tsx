import React, { useMemo } from "react";
import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";

interface table {
  serviceOrder: string;
  model: string;
  warranty: string;
  fault: string;
  imei: string;
  serialNumber: string;
  engineer: string;
  partsIssued: string;
  partsOrdered: string;
}
const newdata: table[] = [
  {
    serviceOrder: "",
    model: "",
    warranty: "",
    fault: "",
    imei: "",
    serialNumber: "",
    engineer: "",
    partsIssued: "",
    partsOrdered: "",
  },
];

//nested data is ok, see accessorKeys in ColumnDef below
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
];
const Table = () => {
  //should be memoized or stable
  const defaultMaterialTheme = createTheme();
  const columns = useMemo<MRT_ColumnDef<table>[]>(
    () => [
      {
        accessorKey: "serviceOrder", //access nested data with dot notation
        header: "Service Order",
      },
      {
        accessorKey: "model",
        header: "Model",
      },
      {
        accessorKey: "warranty", //normal accessorKey
        header: "Warranty",
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
        accessorKey: "serialNumber",
        header: "Serial No.",
      },
      {
        accessorKey: "engineer",
        header: "Engineer",
      },
      {
        accessorKey: "partsIssued",
        header: "Parts Issued",
      },
      {
        accessorKey: "partsOrdered",
        header: "Parts Ordered",
      },
    ],

    []
  );

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialReactTable columns={columns} data={newdata} />
    </ThemeProvider>
  );
};

export default Table;
