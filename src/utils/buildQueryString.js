export const buildQueryString = (endpointPath, filters) => {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value != null)
  );

  const queryParams = new URLSearchParams(validFilters).toString();
  return queryParams ? `${endpointPath}?${queryParams}` : endpointPath;
};

export const extractReadableLabel = (url) => {
  if (!url) return "";
  const urlParts = url.split("/");
  const fileNameWithExt = urlParts.pop();
  const shortFileName = fileNameWithExt.slice(0, 5);
  const fileExtension = fileNameWithExt.split(".").pop();
  return `...${shortFileName}.${fileExtension}`;
};
