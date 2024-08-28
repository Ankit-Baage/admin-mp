import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const advertisementTableColumnsConfig = {
  advertisement: (handleOpenModal, handleOpenView) => [
    columnHelper.accessor("categoryLabel", {
      header: "Category",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("page", {
      header: "Page",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("urlLabel", {
      header: "File Name",
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
            onClick={() => handleOpenView(props.row.original)}
          >
            View
          </button>
          |
          <button
            style={{
              color: "#FF6F3F",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Update")}
          >
            Update
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
            onClick={() => handleOpenModal(props.row.original, "Delete")}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ],
};
