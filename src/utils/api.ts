import axios, { AxiosError, AxiosProgressEvent, AxiosRequestConfig } from "axios";

/**
 * Handles an Axios error and returns a new Error object.
 *
 * @param {AxiosError} error - The Axios error to handle.
 * @return {Error} The new Error object.
 */
function handleError(error: AxiosError): Error {
  console.error("Axios error:", error.response?.data || error.message);
  return new Error(JSON.stringify(error.response?.data) || "An unexpected error occurred");
}

/**
 * Creates a request based on the specified method, URL, data or parameters, headers, and optional progress callback.
 *
 * @param {"get" | "post" | "put" | "delete"} method - The HTTP method for the request.
 * @param {string} url - The URL to send the request to.
 * @param {any} dataOrParams - The data or parameters to be sent with the request.
 * @param {any} [headers={}] - Optional headers for the request.
 * @param {(progressEvent: AxiosProgressEvent) => void} [progressCallback] - Optional callback for tracking progress events.
 * @return {Promise<any>} The response data from the request.
 */
async function createRequest(
  method: "get" | "post" | "put" | "delete",
  url: string,
  dataOrParams: any,
  headers: any = {},
  progressCallback?: (progressEvent: AxiosProgressEvent) => void
): Promise<any> {
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
