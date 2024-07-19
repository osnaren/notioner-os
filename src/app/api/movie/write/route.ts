import { gatherMovieData, updateNotionPage } from "../utils";
import { createResponse } from "@utils/api-helpers";

// Handler for POST requests
export const POST = async (req: Request) => {
  try {
    const { title, year, itemId } = await req.json();
    const movieData = await gatherMovieData({ title, year });
    console.log("movieData", movieData);
    await updateNotionPage(movieData, itemId);
    return createResponse({ status: "New movie added", movie: movieData }, { status: 200 });
  } catch (error) {
    return createResponse({ error: "Failed to add movie" }, { status: 500 });
  }
};
