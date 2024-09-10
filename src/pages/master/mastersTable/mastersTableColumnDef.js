import { createColumnHelper } from "@tanstack/react-table";
import viewIcon from "../../../assets/view.svg";
const columnHelper = createColumnHelper();

export const mastersTableColumnsConfig = {
  spares: (handleVariant) => [
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
    columnHelper.accessor("variants_count", {
      header: "Variant Count",
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
              width:"64px",
              height:"22px",
              backgroundImage: `url(${viewIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleVariant(props.row.original)}
          ></button>
        </div>
      ),
    }),
  ],
  new_phones:  (handleVariant) => [
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
    columnHelper.accessor("variants_count", {
      header: "Variant Count",
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
              width:"64px",
              height:"22px",
              backgroundImage: `url(${viewIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleVariant(props.row.original)}
          ></button>
        </div>
      ),
    }),
  ],

  open_box:  (handleVariant) => [
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
    columnHelper.accessor("variants_count", {
      header: "Variant Count",
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
              width:"64px",
              height:"22px",
              backgroundImage: `url(${viewIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleVariant(props.row.original)}
          ></button>
        </div>
      ),
    }),
  ],
  prexo:  (handleVariant) => [
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
    columnHelper.accessor("variants_count", {
      header: "Variants",
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
              width:"64px",
              height:"22px",
              backgroundImage: `url(${viewIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleVariant(props.row.original)}
          ></button>
        </div>
      ),
    }),
  ],
};
