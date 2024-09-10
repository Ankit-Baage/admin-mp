import { createColumnHelper } from "@tanstack/react-table";
import editIcon from "../../../../assets/edit_icon.svg";
import deleteIcon from "../../../../assets/delete_icon.svg";
const columnHelper = createColumnHelper();

export const masterVariantTableColumnsConfig = {
  spares: (handleOpenModal, handleOpenView) => [
    columnHelper.accessor("part_name", {
      header: "Part Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedColor", {
      header: "Color",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("original_price", {
      header: "Original Price",
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
            columnGap: "8px",
          }}
        >
          <button
            style={{
              width: "56px",
              height: "22px",
              backgroundImage: `url(${editIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Edit")}
          />

          <button
            style={{
              width: "73px",
              height: "22px",
              backgroundImage: `url(${deleteIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Delete")}
          />
        </div>
      ),
    }),
  ],
  new_phones: (handleOpenModal, handleOpenView) => [
    columnHelper.accessor("ram", {
      header: "Ram",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("rom", {
      header: "Rom",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedColor", {
      header: "Color",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("original_price", {
      header: "Original Price",
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
            columnGap: "8px",
          }}
        >
          <button
            style={{
              width: "56px",
              height: "22px",
              backgroundImage: `url(${editIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Edit")}
          />

          <button
            style={{
              width: "73px",
              height: "22px",
              backgroundImage: `url(${deleteIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Delete")}
          />
        </div>
      ),
    }),
  ],

  open_box: (handleOpenModal, handleOpenView) => [
    columnHelper.accessor("ram", {
      header: "Ram",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("rom", {
      header: "Rom",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedColor", {
      header: "Color",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("original_price", {
      header: "Original Price",
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
            columnGap: "8px",
          }}
        >
          <button
            style={{
              width: "56px",
              height: "22px",
              backgroundImage: `url(${editIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Edit")}
          />

          <button
            style={{
              width: "73px",
              height: "22px",
              backgroundImage: `url(${deleteIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Delete")}
          />
        </div>
      ),
    }),
  ],
  prexo: (handleOpenModal, handleOpenView) => [
    columnHelper.accessor("ram", {
      header: "Ram",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("rom", {
      header: "Rom",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("modifiedColor", {
      header: "Color",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("original_price", {
      header: "Original Price",
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
            columnGap: "8px",
          }}
        >
          <button
            style={{
              width: "56px",
              height: "22px",
              backgroundImage: `url(${editIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Edit")}
          />

          <button
            style={{
              width: "73px",
              height: "22px",
              backgroundImage: `url(${deleteIcon})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original, "Delete")}
          />
        </div>
      ),
    }),
  ],
};
