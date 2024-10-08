export const baseUrl = "https://dev.backend.mobigarage.com";

export const version = "/v1";
export const mode = "/mp";
export const role = "/admin";
export const vrp = "/vrp";
export const spares = "/spares";
export const newPhones = "/new_phones";
export const login = "/login";

const uploadImageEndPoint = "upload?file_name=hmmm.zip";

export const uploadImageUrl = `${baseUrl}${version}${mode}/accounts/${uploadImageEndPoint}`;

