import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const retailerTableColumnsConfig = {
  retailer: (handleOpenModal, handleOpenView) => [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("mobile_no", {
      header: "Phone No.",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("email", {
      header: "Email Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("p_status", {
      header: "Profile Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    // columnHelper.accessor("gst_number", {
    //   header: "Gst No.",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    // columnHelper.accessor("pan_number", {
    //   header: "Pan No.",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    // columnHelper.accessor("pan_image_url", {
    //   header: "Pan Img",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    // columnHelper.accessor("aadhar_number", {
    //   header: "Aadhar No.",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    // columnHelper.accessor("aadhar_image_url", {
    //   header: "Aadhar Img",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
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
              backgroundColor: "#FF6F3F",
              padding: "7px 8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original)}
          >
            Pending
          </button>
        </div>
      ),
    }),
  ],
};
