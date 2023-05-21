// import React, { useMemo } from "react";
// import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table";
// import { ThemeProvider, createTheme } from "@mui/material";

// //nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//   {
//     name: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     address: "261 Erdman Ford",
//     city: "East Daphne",
//     state: "Kentucky",
//   },
//   {
//     name: {
//       firstName: "Jane",
//       lastName: "Doe",
//     },
//     address: "769 Dominic Grove",
//     city: "Columbus",
//     state: "Ohio",
//   },
//   {
//     name: {
//       firstName: "Joe",
//       lastName: "Doe",
//     },
//     address: "566 Brakus Inlet",
//     city: "South Linda",
//     state: "West Virginia",
//   },
//   {
//     name: {
//       firstName: "Kevin",
//       lastName: "Vandy",
//     },
//     address: "722 Emie Stream",
//     city: "Lincoln",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
// ];

// const Table = () => {
//   //should be memoized or stable
//   const defaultMaterialTheme = createTheme();
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "service_order", //access nested data with dot notation
//         header: "Service Order No",
//       },
//       {
//         accessorKey: "model",
//         header: "Model",
//       },
//       {
//         accessorKey: "Booked", //normal accessorKey
//         header: "Address",
//       },
//       {
//         accessorKey: "city",
//         header: "City",
//       },
//       {
//         accessorKey: "state",
//         header: "State",
//       },
//     ],
//     []
//   );

//   return (
//     <ThemeProvider theme={defaultMaterialTheme}>
//       <MaterialReactTable columns={columns} data={data} />
//     </ThemeProvider>
//   );
// };

// export default Table;
