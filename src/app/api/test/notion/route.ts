import notion from "@utils/notion";
import { createResponse } from "@utils/api-helpers";

// Handler for POST requests
export const POST = async (req: Request) => {
  try {
    const { pageId } = await req.json();
    const response = await notion.retrievePage({ page_id: pageId });

    if (!response) {
      return createResponse({ error: "Page not found" }, { status: 404 });
    }

    return createResponse(response, { status: 200 });
  } catch (error) {
    return createResponse({ error: "Failed to retrieve page" }, { status: 500 });
  }
};
