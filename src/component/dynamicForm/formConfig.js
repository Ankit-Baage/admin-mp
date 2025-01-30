export const formConfig = {
  inventory: (formData) => [
    {
      id: "requestId",
      type: "text",
      defaultValue: formData.request_id,
      label: "Request Id",
      placeholder: "Request Id",
      disabled: true,
    },
    {
      id: "originalPrice",
      type: "text",
      defaultValue: formData.original_price,
      label: "Original Price",
      placeholder: "Original Price",
      disabled: true,
    },
    {
      id: "remarks",
      type: "textarea",
      defaultValue: formData.remarks === "-" ? null : formData.remarks,
      label: "Remarks*",
      placeholder: "Remarks*",
      disabled: formData.approval_status !== "pending",
    },
  ],
  retailer: (formData) => [
    {
      id: "phoneNumber",
      type: "text",
      defaultValue: formData.mobile_no,
      label: "Phone Number",
      placeholder: "Phone Number",
      disabled: true,
    },
    {
      id: "status",
      type: "select",
      options: [
        { id: 3, label: "Verified" },
        { id: 4, label: "Rejected" },
      ],
      label: "Choose Status",
      defaultValue:
        formData.p_status_id === (0 || 1 || 2) ? "" : formData.p_status_id,
      // disabled: true,
    },

    {
      id: "aadharNumber",
      type: "text",
      defaultValue: formData.aadhar_number,
      label: "Aadhar Number",
      placeholder: "Aadhar Number",
      disabled: true,
    },

    {
      id: "aadharImage",
      type: "preview", // Allow editing
      defaultValue: formData?.aadhar_image_url,
      url: formData?.aadhar_image_url,
      label: "Aadhar Image",
      urlLabel: formData?.aadharUrlLabel,
      disabled: true,
      media_type: "image",
    },
    {
      id: "panNumber",
      type: "text", // Allow editing
      defaultValue: formData.pan_number,
      label: "Pan Number",
      disabled: true, // Editable field
    },
    {
      id: "PanImage",
      type: "preview", // Allow editing
      defaultValue: formData.pan_image_url,
      url: formData?.pan_image_url,
      label: "Pan Image",
      urlLabel: formData.panUrlLabel,
      media_type: "image",
      disabled: true,
    },
  ],
  order: (formData) => [
    {
      id: "orderId",
      type: "text",
      defaultValue: formData?.order_id,
      label: "Order Id",
      placeholder: "Order Id",
      disabled: true, // Read-only field for update as well
    },
    {
      id: "transactionId",
      type: "text",
      defaultValue: formData?.transaction_id,
      label: "Transaction Id",
      placeholder: "Transaction Id",
      disabled: false, // Read-only field for update as well
    },
    {
      id: "paymentStatus",
      type: "text",
      defaultValue: formData.payment_status,
      label: "Payment Status",
      placeholder: "Payment Status",
      disabled: true, // Read-only field for update as well
    },
    {
      id: "paymentDetails",
      type: "text",
      defaultValue: formData.payment_details,
      label: "Payment Details",
      placeholder: "Payment Details",
      // disabled: true,
    },
    {
      id: "status",
      type: "select",
      options: [
        { id: 1, label: "Approve" },
        { id: 2, label: "Reject" },
      ],
      label: "Choose Status",
      defaultValue:
        formData.approval_status === "0" ? "" : formData.approval_status,
    },

    {
      id: "url",
      type: "file",
      defaultValue: formData?.url,
      url: formData?.url,
      urlLabel: formData?.urlLabel,
    },
  ],
  advertisement: (formData) => [
    {
      id: "sequence",
      type: "text",
      defaultValue: formData?.sequence,
      label: "Sequence",
      placeholder: "Sequence",
      disabled: formData.identifier === "Delete",
    },
    {
      id: "navigateTo",
      type: "text",
      defaultValue: formData?.navigate_to_page,
      label: "Navigate To",
      placeholder: "Navigate To",
      disabled: formData.identifier === "Delete",
    },

    {
      id: "url",
      type: "file", // Allow editing
      defaultValue: formData?.url,
      // label: "Upload",
      url: formData?.url,
      urlLabel: formData?.urlLabel,
      disabled: formData.identifier === "Delete",
    },
    {
      id: "module",
      name: "module",
      label: "Choose Module",
      type: "select",
      options: formData.moduleList,
      defaultValue: formData.category,
      disabled: formData.identifier === "Delete",
    },
    {
      id: "page",
      name: "page",
      type: "select",
      options: formData.pageList,
      label: "Choose Page",
      defaultValue: formData.page,
      disabled: formData.identifier === "Delete",
    },
    {
      id: "mediaType",
      name: "mediaType",
      type: "select",
      options: [
        { id: "image", label: "image" },
        { id: "video", label: "video" },
      ],
      defaultValue: formData.media_type,
      label: "Choose Media Type",
      disabled: formData.identifier === "Delete",
    },
    {
      id: "params",
      type: "textarea",
      defaultValue: formData.params,
      label: "Parameters",
      placeholder: "Parameters",
      disabled: formData.identifier === "Delete",
    },
  ],
};
