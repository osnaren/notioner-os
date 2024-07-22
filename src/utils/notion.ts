import { Client, isNotionClientError } from "@notionhq/client";
import {
  AppendBlockChildrenParameters,
  AppendBlockChildrenResponse,
  CreateDatabaseParameters,
  CreateDatabaseResponse,
  CreatePageParameters,
  CreatePageResponse,
  CreateCommentParameters,
  CreateCommentResponse,
  DeleteBlockParameters,
  DeleteBlockResponse,
  ListCommentsParameters,
  ListCommentsResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  GetBlockParameters,
  GetBlockResponse,
  GetDatabaseParameters,
  GetDatabaseResponse,
  GetPageParameters,
  GetPageResponse,
  SearchParameters,
  SearchResponse,
  UpdateBlockParameters,
  UpdateBlockResponse,
  UpdateDatabaseParameters,
  UpdateDatabaseResponse,
  UpdatePageParameters,
  UpdatePageResponse,
  GetPagePropertyParameters,
  GetPagePropertyResponse,
  ListUsersResponse,
  GetUserParameters,
  ListBlockChildrenParameters,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const AUTH_TOKEN = process.env.NOTION_AUTH_TOKEN as string;

if (!AUTH_TOKEN) {
  throw new Error("Notion API token must be provided");
}

// Initialize Notion client
const notion = new Client({
  auth: AUTH_TOKEN,
});

// Define error handling function
const handleNotionError = (error: unknown): void => {
  if (isNotionClientError(error)) {
    const stackLines = error.stack?.split("\n");
    if (stackLines && stackLines.length > 1) {
      const callingFunctionLine = stackLines[1].trim();
      const callingFunctionName = callingFunctionLine.substring(callingFunctionLine.lastIndexOf(" ") + 1);
      console.error(`Error in calling function: ${callingFunctionName}`);
    } else {
      console.error("Unknown calling function");
    }
    console.error("Notion API error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
  throw error;
};

// BLOCKS API

/**
 * Appends children blocks to a parent block.
 * @param {AppendBlockChildrenParameters['block_id']} blockId - The ID of the block to append children to.
 * @param {AppendBlockChildrenParameters['children']} children - An array of block objects to append.
 * @returns {Promise<AppendBlockChildrenResponse | undefined>} The response from the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/patch-block-children
 */
export const appendBlockChildren = async (
  blockId: AppendBlockChildrenParameters["block_id"],
  children: AppendBlockChildrenParameters["children"]
): Promise<AppendBlockChildrenResponse | undefined> => {
  try {
    return await notion.blocks.children.append({ block_id: blockId, children });
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves a single block using its ID.
 * @param {GetBlockParameters} blockId - The ID of the block to retrieve.
 * @returns {Promise<GetBlockResponse | undefined>} The block object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-block
 */
export const retrieveBlock = async (blockId: GetBlockParameters): Promise<GetBlockResponse | undefined> => {
  try {
    return await notion.blocks.retrieve(blockId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves the children of a block.
 * @param {ListBlockChildrenParameters} blockId - The ID of the block whose children are to be retrieved.
 * @returns {Promise<AppendBlockChildrenResponse | undefined>} An array of block objects representing the children.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-block-children
 */
export const retrieveBlockChildren = async (
  blockId: ListBlockChildrenParameters
): Promise<AppendBlockChildrenResponse | undefined> => {
  try {
    return await notion.blocks.children.list(blockId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Updates a specific block.
 * @param {UpdateBlockParameters} blockData - The data object for the block to update.
 * @returns {Promise<UpdateBlockResponse | undefined>} The updated block object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/update-a-block
 */
export const updateBlock = async (blockData: UpdateBlockParameters): Promise<UpdateBlockResponse | undefined> => {
  try {
    return await notion.blocks.update(blockData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Deletes a specific block.
 * @param {DeleteBlockParameters} blockId - The ID of the block to delete.
 * @returns {Promise<DeleteBlockResponse | undefined>} The response from the Notion API indicating successful deletion.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/delete-a-block
 */
export const deleteBlock = async (blockId: DeleteBlockParameters): Promise<DeleteBlockResponse | undefined> => {
  try {
    return await notion.blocks.delete(blockId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

// PAGES API

/**
 * Creates a new page in Notion.
 * @param {CreatePageParameters} pageData - The data object for the new page.
 * @returns {Promise<CreatePageResponse | undefined>} The newly created page object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/post-page
 */
export const createPage = async (pageData: CreatePageParameters): Promise<CreatePageResponse | undefined> => {
  try {
    return await notion.pages.create(pageData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves a specific page by its ID.
 * @param {GetPageParameters} pageId - The ID of the page to retrieve.
 * @returns {Promise<GetPageResponse | undefined>} The retrieved page object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-page
 */
export const retrievePage = async (pageId: GetPageParameters): Promise<GetPageResponse | undefined> => {
  try {
    return await notion.pages.retrieve(pageId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves a specific property from a page.
 * @param {GetPagePropertyParameters} retrieveData - The data object for the property to retrieve.
 * @returns {Promise<GetPagePropertyResponse | undefined>} The page property object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-page-property
 */
export const retrievePageProperty = async (
  retrieveData: GetPagePropertyParameters
): Promise<GetPagePropertyResponse | undefined> => {
  try {
    return await notion.pages.properties.retrieve(retrieveData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Updates properties of a specific page.
 * @param {UpdatePageParameters} pageProperties - The data object for the properties to update.
 * @returns {Promise<UpdatePageResponse | undefined>} The updated page object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/patch-page
 */
export const updatePageProperties = async (
  pageProperties: UpdatePageParameters
): Promise<UpdatePageResponse | undefined> => {
  try {
    return await notion.pages.update(pageProperties);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Archives a specific page.
 * @param {UpdatePageParameters['page_id']} pageId - The ID of the page to archive.
 * @returns {Promise<UpdatePageResponse | undefined>} The response from the Notion API indicating successful archiving.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/archive-a-page
 */
export const archivePage = async (pageId: UpdatePageParameters["page_id"]): Promise<UpdatePageResponse | undefined> => {
  try {
    return await notion.pages.update({ page_id: pageId, archived: true });
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

// DATABASES API

/**
 * Creates a new database in Notion.
 * @param {CreateDatabaseParameters} databaseData - The data object for the new database.
 * @returns {Promise<CreateDatabaseResponse | undefined>} The newly created database object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/create-a-database
 */
export const createDatabase = async (
  databaseData: CreateDatabaseParameters
): Promise<CreateDatabaseResponse | undefined> => {
  try {
    return await notion.databases.create(databaseData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Queries a database in Notion and retrieves the results based on the provided query.
 * @param {QueryDatabaseParameters} queryData - The query object to filter and sort the database entries.
 * @returns {Promise<QueryDatabaseResponse | undefined>} The query result as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/post-database-query
 */
export const queryDatabase = async (queryData: QueryDatabaseParameters): Promise<QueryDatabaseResponse | undefined> => {
  try {
    return await notion.databases.query(queryData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves a specific database by its ID.
 * @param {GetDatabaseParameters} databaseId - The ID of the database to retrieve.
 * @returns {Promise<GetDatabaseResponse | undefined>} The database object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-database
 */
export const retrieveDatabase = async (databaseId: GetDatabaseParameters): Promise<GetDatabaseResponse | undefined> => {
  try {
    return await notion.databases.retrieve(databaseId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Updates a specific database.
 * @param {UpdateDatabaseParameters} updateData - An object containing the updates to apply to the database.
 * @returns {Promise<UpdateDatabaseResponse | undefined>} The updated database object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/update-a-database
 */
export const updateDatabase = async (
  updateData: UpdateDatabaseParameters
): Promise<UpdateDatabaseResponse | undefined> => {
  try {
    return await notion.databases.update(updateData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

// USERS API

/**
 * Retrieves a list of all users in the workspace.
 * @returns {Promise<ListUsersResponse | undefined>} A list of user objects as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-users
 */
export const listAllUsers = async (): Promise<ListUsersResponse | undefined> => {
  try {
    return await notion.users.list({});
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves a specific user by their ID.
 * @param {GetUserParameters} userId - The ID of the user to retrieve.
 * @returns {Promise<UserObjectResponse | undefined>} The user object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-user
 */
export const retrieveUser = async (userId: GetUserParameters): Promise<UserObjectResponse | undefined> => {
  try {
    return await notion.users.retrieve(userId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves the bot user associated with the token used for API calls.
 * @returns {Promise<UserObjectResponse | undefined>} The bot user object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-self
 */
export const retrieveBotUser = async (): Promise<UserObjectResponse | undefined> => {
  try {
    return await notion.users.me({});
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

// COMMENTS API

/**
 * Creates a new comment on a page or block.
 * @param {CreateCommentParameters} commentData - The data object for the new comment.
 * @returns {Promise<BlockObjectResponse | undefined>} The newly created comment object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/create-a-comment
 */
export const createComment = async (
  commentData: CreateCommentParameters
): Promise<CreateCommentResponse | undefined> => {
  try {
    return await notion.comments.create(commentData);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

/**
 * Retrieves comments from a specific block.
 * @param {ListCommentsParameters} blockId - The ID of the block to retrieve comments from.
 * @returns {Promise<ListCommentsResponse | undefined>} A list of comment objects as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-comment
 */
export const retrieveComments = async (blockId: ListCommentsParameters): Promise<ListCommentsResponse | undefined> => {
  try {
    return await notion.comments.list(blockId);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

// SEARCH API

/**
 * Performs a search across all pages and databases accessible to the integration.
 * @param {SearchParameters} query - The search query object.
 * @returns {Promise<SearchResponse | undefined>} Search results as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/changelog/search-is-now-available-in-the-api
 */
export const search = async (query: SearchParameters): Promise<SearchResponse | undefined> => {
  try {
    return await notion.search(query);
  } catch (error) {
    handleNotionError(error);
  }
  return undefined;
};

export default {
  appendBlockChildren,
  retrieveBlock,
  retrieveBlockChildren,
  updateBlock,
  deleteBlock,
  createPage,
  retrievePage,
  retrievePageProperty,
  updatePageProperties,
  archivePage,
  createDatabase,
  queryDatabase,
  retrieveDatabase,
  updateDatabase,
  listAllUsers,
  retrieveUser,
  retrieveBotUser,
  createComment,
  retrieveComments,
  search,
};
