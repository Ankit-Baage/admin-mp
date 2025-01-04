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
      header: "Qty",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("total_amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("postal_code", {
      header: "PinCode",
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
      cell: (info) => {
        const timestamp = info.getValue();
        const date = new Date(timestamp * 1000);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);

        return `${day}/${month}/${year}`;
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("approval_status", {
      header: "Approval Status",
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
              backgroundColor: "#46CD80",
              padding: "7px 8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original)}
          >
            View
          </button>
        </div>
      ),
    }),
  ],
};
