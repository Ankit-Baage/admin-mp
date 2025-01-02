import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const orderTableColumnsConfig = {
  order: (handleOpenModal) => [
    columnHelper.accessor("order_id", {
      header: "Order id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("num_of_items", {
      header: "No .of items",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor(",total_amount", {
      header: "Total Amt",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("postal_code", {
      header: "Postal Code",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor(",payment_status", {
      header: "Payment Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("order_status", {
      header: "Order status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("ordered_on", {
      header: "Ordered On",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.display({
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <button
            style={{
              color: "#FFFFFF",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 400,
              fontFamily: "Poppins, sans",
              backgroundColor:"#46CD80",
              padding: "7px 8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original)}
          >
           View & Verify
          </button>
        </div>
      ),
    }),
  ],
};
