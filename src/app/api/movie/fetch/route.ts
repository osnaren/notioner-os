import { createResponse } from "@utils/api-helpers";

// Handler for POST requests
export const POST = async (req: Request) => {
  return createResponse({ status: "Endpoint not implemented" }, { status: 200 });
};
