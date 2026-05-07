import { MOVIES_DB_ID } from '@config/constants';
import { createResponse } from '@utils/api-helpers';
import notion from '@utils/notion';

// Handler for GET requests
export const GET = async () => {
  try {
    const response = await notion.queryDatabase({
      database_id: MOVIES_DB_ID,
    });
    return createResponse(response, { status: 200 });
  } catch (error) {
    return createResponse({ error: 'Failed to fetch movies', details: error }, { status: 500 });
  }
};
