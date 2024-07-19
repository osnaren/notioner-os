type ResponseBody = Record<string, any> | string | null | undefined;

interface CreateResponseOptions {
  status: number;
  headers?: HeadersInit;
}

/**
 * Utility function to create a Response object with JSON content.
 * @param {ResponseBody} body - The body of the response.
 * @param {CreateResponseOptions} options - The response options including status and headers.
 * @returns {Response} - The Response object.
 */
export const createResponse = (
  body: ResponseBody,
  { status, headers = { 'Content-Type': 'application/json' } }: CreateResponseOptions
): Response => {
  const responseHeaders = new Headers(headers);
  let responseBody: string;

  if (typeof body === 'string') {
    responseBody = body;
  } else if (body) {
    responseBody = JSON.stringify(body);
  } else {
    responseBody = '';
  }

  return new Response(responseBody, {
    headers: responseHeaders,
    status,
  });
};
