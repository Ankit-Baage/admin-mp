import { uploadImageUrl } from "../config/config";
import axiosInstance from "../axios/axiosTokenMiddleware";

export const uploadImageRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axiosInstance.post(uploadImageUrl, formData);

    console.log("Upload successful:", file);

    return response; // Return the specific data you need from the response
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Server error");
  }
};
