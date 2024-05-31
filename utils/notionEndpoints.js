import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const AUTH_TOKEN = process.env.AUTH_TOKEN;

import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: AUTH_TOKEN,
});

// Define error handling function
const handleNotionError = (error) => {
  // Extract the call stack from the error
  const stackLines = error.stack.split("\n");

  // The calling function name is usually on the second line of the stack trace
  if (stackLines.length > 1) {
    const callingFunctionLine = stackLines[1].trim();
    const callingFunctionName = callingFunctionLine.substring(
      callingFunctionLine.lastIndexOf(" ") + 1
    );

    console.error(`Error in calling function: ${callingFunctionName}`);
  } else {
    console.error("Unknown calling function");
  }

  console.error("Notion API error:", error);
  throw error;
};

// BLOCKS API
/**
 * Appends children blocks to a parent block.
 * @param {string} blockId - The ID of the block to append children to.
 * @param {Object[]} children - An array of block objects to append.
 * @returns {Promise<Object>} The response from the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/patch-block-children
 */
const appendBlockChildren = async (blockId, children) => {
  try {
    return await notion.blocks.children.append({ block_id: blockId, children });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves a single block using its ID.
 * @param {string} blockId - The ID of the block to retrieve.
 * @returns {Promise<Object>} The block object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-block
 */
const retrieveBlock = async (blockId) => {
  try {
    return await notion.blocks.retrieve({ block_id: blockId });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves the children of a block.
 * @param {string} blockId - The ID of the block whose children are to be retrieved.
 * @returns {Promise<Object>} An array of block objects representing the children.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-block-children
 */
const retrieveBlockChildren = async (blockId) => {
  try {
    return await notion.blocks.children.list({ block_id: blockId });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Updates a specific block.
 * @param {string} blockId - The ID of the block to update.
 * @param {Object} block - The block object with updated properties.
 * @returns {Promise<Object>} The updated block object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/update-a-block
 */
const updateBlock = async (blockId, block) => {
  try {
    return await notion.blocks.update({ block_id: blockId, ...block });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Deletes a specific block.
 * @param {string} blockId - The ID of the block to delete.
 * @returns {Promise<Object>} The response from the Notion API indicating successful deletion.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/delete-a-block
 */
const deleteBlock = async (blockId) => {
  try {
    return await notion.blocks.delete({ block_id: blockId });
  } catch (error) {
    handleNotionError(error);
  }
};

// PAGES API
/**
 * Creates a new page in Notion.
 * @param {Object} pageData - The data object for the new page.
 * @returns {Promise<Object>} The newly created page object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/post-page
 */
const createPage = async (pageData) => {
  try {
    return await notion.pages.create(pageData);
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves a specific page by its ID.
 * @param {string} pageId - The ID of the page to retrieve.
 * @returns {Promise<Object>} The retrieved page object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-page
 */
const retrievePage = async (pageId) => {
  try {
    return await notion.pages.retrieve({ page_id: pageId });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves a specific property from a page.
 * @param {string} pageId - The ID of the page.
 * @param {string} propertyId - The ID of the property to retrieve.
 * @returns {Promise<Object>} The page property object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-page-property
 */
const retrievePageProperty = async (pageId, propertyId) => {
  try {
    return await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Updates properties of a specific page.
 * @param {string} pageId - The ID of the page to update.
 * @param {Object} properties - An object containing the properties to update.
 * @returns {Promise<Object>} The updated page object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/patch-page
 */
const updatePageProperties = async (pageId, properties) => {
  try {
    return await notion.pages.update({ page_id: pageId, properties });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Archives a specific page.
 * @param {string} pageId - The ID of the page to archive.
 * @returns {Promise<Object>} The response from the Notion API indicating successful archiving.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/archive-a-page
 */
const archivePage = async (pageId) => {
  try {
    return await notion.pages.update({ page_id: pageId, archived: true });
  } catch (error) {
    handleNotionError(error);
  }
};

// Databases API
/**
 * Creates a new database in Notion.
 * @param {Object} databaseData - The data object for the new database.
 * @returns {Promise<Object>} The newly created database object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/create-a-database
 */
const createDatabase = async (databaseData) => {
  try {
    return await notion.databases.create(databaseData);
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Queries a database in Notion and retrieves the results based on the provided query.
 * @param {string} databaseId - The ID of the database to query.
 * @param {Object} query - The query object to filter and sort the database entries.
 * @returns {Promise<Object>} The query result as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/post-database-query
 */
const queryDatabase = async (databaseId, query) => {
  try {
    return await notion.databases.query({ database_id: databaseId, ...query });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves a specific database by its ID.
 * @param {string} databaseId - The ID of the database to retrieve.
 * @returns {Promise<Object>} The database object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-database
 */
const retrieveDatabase = async (databaseId) => {
  try {
    return await notion.databases.retrieve({ database_id: databaseId });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Updates a specific database.
 * @param {string} databaseId - The ID of the database to update.
 * @param {Object} updates - An object containing the updates to apply to the database.
 * @returns {Promise<Object>} The updated database object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/update-a-database
 */
const updateDatabase = async (databaseId, updates) => {
  try {
    return await notion.databases.update({
      database_id: databaseId,
      ...updates,
    });
  } catch (error) {
    handleNotionError(error);
  }
};

// Users API
/**
 * Retrieves a list of all users in the workspace.
 * @returns {Promise<Object>} A list of user objects as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-users
 */
const listAllUsers = async () => {
  try {
    return await notion.users.list();
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves a specific user by their ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} The user object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-user
 */
const retrieveUser = async (userId) => {
  try {
    return await notion.users.retrieve({ user_id: userId });
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves the bot user associated with the token used for API calls.
 * @returns {Promise<Object>} The bot user object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/get-self
 */
const retrieveBotUser = async () => {
  try {
    return await notion.users.me({});
  } catch (error) {
    handleNotionError(error);
  }
};

// Comments API
/**
 * Creates a new comment on a page or block.
 * @param {Object} commentData - The data object for the new comment.
 * @returns {Promise<Object>} The newly created comment object as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/create-a-comment
 */
const createComment = async (commentData) => {
  try {
    return await notion.comments.create(commentData);
  } catch (error) {
    handleNotionError(error);
  }
};

/**
 * Retrieves comments from a specific block.
 * @param {string} blockId - The ID of the block to retrieve comments from.
 * @returns {Promise<Object>} A list of comment objects as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/reference/retrieve-a-comment
 */
const retrieveComments = async (blockId) => {
  try {
    return await notion.comments.list({ block_id: blockId });
  } catch (error) {
    handleNotionError(error);
  }
};

// Search API
/**
 * Performs a search across all pages and databases accessible to the integration.
 * @param {Object} query - The search query object.
 * @returns {Promise<Object>} Search results as returned by the Notion API.
 * @throws {Error} Throws an error if the Notion API call fails.
 *
 * Notion API Reference: https://developers.notion.com/changelog/search-is-now-available-in-the-api
 */
const search = async (query) => {
  try {
    return await notion.search(query);
  } catch (error) {
    handleNotionError(error);
  }
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
