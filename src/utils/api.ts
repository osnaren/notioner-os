import axios, { AxiosError, AxiosProgressEvent, AxiosRequestConfig } from "axios";

function handleError(error: AxiosError): Error {
  console.error("Axios error:", error.response?.data || error.message);
  return new Error(JSON.stringify(error.response?.data) || "An unexpected error occurred");
}

async function createRequest(
  method: "get" | "post" | "put" | "delete",
  url: string,
  dataOrParams: any,
  headers: any = {},
  progressCallback?: (progressEvent: AxiosProgressEvent) => void
) {
  const config: AxiosRequestConfig = {
    headers,
    onUploadProgress: progressCallback,
    onDownloadProgress: progressCallback,
  };

  if (method === "get" || method === "delete") {
    config.params = dataOrParams;
  }

  try {
    const response = await axios[method](url, method === "get" || method === "delete" ? config : dataOrParams, config);
    return response.data;
  } catch (error) {
    throw handleError(error as AxiosError);
  }
}

export { createRequest };
