import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const mastersVrpTableColumnsConfig = {
  vrp: (handleOpenModal) => [
    columnHelper.accessor("modifiedBrand", {
      header: "Brand",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedModel", {
      header: "Model",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedRam", {
      header: "Ram",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedRom", {
      header: "Rom",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedColor", {
      header: "Color",
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
              color: "#46CD80",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Approve")}
          >
            Approve
          </button>
          |
          <button
            style={{
              color: "#FE0000",
              fontSize: "14px",
              lineHeight: "14px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Reject")}
          >
            Reject
          </button>
        </div>
      ),
    }),
  ],
};