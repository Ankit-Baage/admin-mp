import { baseUrl, version, mode, role, spares, sellers } from "..";

export const spareUrl = `${baseUrl}${version}${mode}${role}${spares}`;
const spareProductDetailDownloadEndPoint = "download_file?request_id=";

export const spareProductDetailDownloadUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${spares}${spareProductDetailDownloadEndPoint}${requestId}`;

export const spareSellerPriorityListUrl = `${baseUrl}${version}${mode}${role}${sellers}`;

export const sparePriorityListLotUrl = (seller_id) =>
  `${baseUrl}${version}${mode}${role}spares_lots?seller_id=${seller_id}`;

export const spareSellerLotUrl = (seller_id, lot_id)=>`${baseUrl}${version}${mode}${role}priority?seller_id=${seller_id}&lot_id=${lot_id}`;