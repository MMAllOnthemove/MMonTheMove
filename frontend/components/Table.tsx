import { Box, ThemeProvider, createTheme } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const Table = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  // Fetching info from our database
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MANAGEMENT_PAGE_SERVER_LINK}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTableData(data);
      });
  }, [tableData]);

  //should be memoized or stable
  const defaultMaterialTheme = createTheme();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "service_order_no", //access nested data with dot notation
        header: "Service Order",
        enableClickToCopy: true,
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "warranty",
        header: "Warranty",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "model", //normal accessorKey
        header: "Model",
        enableClickToCopy: true,
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "imei",
        header: "IMEI",
        enableClickToCopy: true,
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "serial_number",
        header: "Serial Number",
        enableClickToCopy: true,
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "engineer",
        header: "Engineer",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "fault",
        header: "Condition",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "engineer_analysis",
        header: "Engineer Analysis",
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
        renderDetailPanel={({ row }) => (
          <Box sx={{ fontWeight: "fontWeightLight" }}>
            {tableData.map((item) => (
              <section key={item.id} className="grid grid-cols-2">
                <div>
                  <h2 className="text-2xl uppercase text-slate-900 pb-2">
                    Info
                  </h2>

                  <p>
                    Service Order no: <strong>{item?.service_order_no}</strong>
                  </p>
                  <p>
                    AscCode: <strong>{item?.asc_code}</strong>
                  </p>
                  <p>
                    Created By: <strong>{item?.created_by}</strong>
                  </p>
                  <p>
                    Created Date: <strong>{item?.created_date}</strong>
                  </p>
                  <p>
                    Created Time: <strong>{item?.created_time}</strong>
                  </p>
                  <p>
                    Status: <strong>{item?.status}</strong>
                  </p>
                  <p>
                    StatusDesc: <strong>{item?.status_desc}</strong>
                  </p>
                  <p>
                    Accessory: <strong>{item?.accessory}</strong>
                  </p>
                  <p>
                    Produced date: <strong>{item?.produced_date}</strong>
                  </p>
                  <p>
                    Purchased date: <strong>{item?.purchased_date}</strong>
                  </p>
                  <p>
                    Remark: <strong>{item?.remark}</strong>
                  </p>
                  <p>
                    WtyTermRemark: <strong>{item?.wty_term_remark}</strong>
                  </p>
                  <p>
                    Customer request date:{" "}
                    <strong>{item?.customer_request_date}</strong>
                  </p>
                  <p>
                    Customer request time:{" "}
                    <strong>{item?.customer_request_time}</strong>
                  </p>
                  <p>
                    Acknowledge date: <strong>{item?.acknowledge_date}</strong>
                  </p>
                  <p>
                    Acknowledge time: <strong>{item?.acknowledge_time}</strong>
                  </p>
                  <p>
                    Complete date: <strong>{item?.complete_date}</strong>
                  </p>
                  <p>
                    Complete time: <strong>{item?.complete_time}</strong>
                  </p>
                  <p>
                    Engineer assign date:{" "}
                    <strong>{item?.engineer_assign_date}</strong>
                  </p>
                  <p>
                    Engineer assign time:{" "}
                    <strong>{item?.engineer_assign_time}</strong>
                  </p>
                  <p>
                    First Appointment date:{" "}
                    <strong>{item?.first_appointment_date}</strong>
                  </p>
                  <p>
                    First Appointment time:{" "}
                    <strong>{item?.first_appointment_time}</strong>
                  </p>
                  <p>
                    First Visit date: <strong>{item?.first_visit_date}</strong>
                  </p>
                  <p>
                    First Visit time: <strong>{item?.first_visit_time}</strong>
                  </p>
                  <p>
                    First Customer date:{" "}
                    <strong>{item?.first_customer_date}</strong>
                  </p>
                  <p>
                    First Customer time:{" "}
                    <strong>{item?.first_customer_time}</strong>
                  </p>
                  <p>
                    Goods delivery date:{" "}
                    <strong>{item?.goods_delivery_time}</strong>
                  </p>
                  <p>
                    Goods delivery time:{" "}
                    <strong>{item?.goods_delivery_time}</strong>
                  </p>
                  <p>
                    Last appointment date:{" "}
                    <strong>{item?.last_appointment_date}</strong>
                  </p>
                  <p>
                    Last appointment time:{" "}
                    <strong>{item?.last_appointment_time}</strong>
                  </p>
                  <p>
                    Last change date: <strong>{item?.last_change_date}</strong>
                  </p>
                  <p>
                    Last change time: <strong>{item?.last_change_time}</strong>
                  </p>
                  <p>
                    Last visit date: <strong>{item?.last_visit_date}</strong>
                  </p>
                  <p>
                    Last visit time: <strong>{item?.last_visit_time}</strong>
                  </p>
                  <p>
                    Repair receive date:{" "}
                    <strong>{item?.repair_receive_date}</strong>
                  </p>
                  <p>
                    Repair receive time:{" "}
                    <strong>{item?.repair_receive_time}</strong>
                  </p>
                  <p>
                    Unit receive date:{" "}
                    <strong>{item?.unit_receive_time}</strong>
                  </p>
                  <p>
                    Unit receive time:{" "}
                    <strong>{item?.unit_receive_time}</strong>
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl uppercase text-slate-900 pb-2">
                    Dates
                  </h2>
                  <p>
                    Customer first name:{" "}
                    <strong>{item?.customer_first_name}</strong>
                  </p>
                  <p>
                    Customer last name:{" "}
                    <strong>{item?.customer_last_name}</strong>
                  </p>
                  <p>
                    Customer street address:{" "}
                    <strong>{item?.customer_street_address}</strong>
                  </p>
                  <p>
                    Customer district:{" "}
                    <strong>{item?.customer_district}</strong>
                  </p>
                  <p>
                    Customer province:{" "}
                    <strong>{item?.customer_province}</strong>
                  </p>
                  <p>Customer zip code: {item?.customer_zip}</p>
                  <p>Customer home phone: {item?.customer_home_phone}</p>
                  <p>Customer mobile phone: {item?.customer_mobile_phone}</p>
                  <p>Customer office phone: {item?.customer_office_phone}</p>
                  <p>Customer Email: {item?.customer_email}</p>
                  <p>Customer Code: {item?.customer_code}</p>
                </div>
              </section>
            ))}
          </Box>
        )}
      />
    </ThemeProvider>
  );
};

export default Table;
