import {
  NumberPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  StatusPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  ExternalFilePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from "@ctypes/movie-type";

/**
 * Creates a number property for a Notion page.
 * @param {string | number} numValue - The value to convert to a number.
 * @param {string} propertyId - The ID of the property.
 * @returns {NumberPropertyItemObjectResponse} - The Notion number property.
 */
const createNumber = (numValue: string | number, propertyId = ""): NumberPropertyItemObjectResponse => {
  return {
    type: "number",
    number: numValue === "#NUM!" ? null : Number.parseFloat(numValue.toString()),
    id: propertyId,
  };
};

/**
 * Creates a status property for a Notion page.
 * @param {string} statusValue - The status value.
 * @param {string} propertyId - The ID of the property.
 * @returns {StatusPropertyItemObjectResponse} - The Notion status property.
 */
const createStatus = (statusValue: string, propertyId = ""): StatusPropertyItemObjectResponse => {
  return {
    type: "status",
    status: { name: statusValue },
    id: propertyId,
  };
};

/**
 * Creates a date property for a Notion page.
 * @param {string} startDate - The date string in "DD/MM/YYYY" format.
 * @param {string} endDate - The date string in "DD/MM/YYYY" format.
 * @param {string} propertyId - The ID of the property.
 * @returns {DatePropertyItemObjectResponse} - The Notion date property.
 */
const createDate = (startDate: string, endDate = "", propertyId = ""): DatePropertyItemObjectResponse => {
  return {
    type: "date",
    date: {
      start: startDate.split("/").reverse().join("-"),
      end: endDate.split("/").reverse().join("-") || null,
      time_zone: "Asia/Kolkata",
    },
    id: propertyId,
  };
};

/**
 * Creates a files property for a Notion page.
 * @param {string} fileUrl - The URL of the file.
 * @param {string} fileTitle - The title of the file.
 * @param {string} propertyId - The ID of the property.
 * @returns {FilesPropertyItemObjectResponse} - The Notion files property.
 */
const createFiles = (fileUrl: string, fileTitle: string, propertyId = ""): FilesPropertyItemObjectResponse => {
  return {
    type: "files",
    files: [
      {
        type: "external",
        name: fileTitle,
        external: {
          url: fileUrl,
        },
      },
    ],
    id: propertyId,
  };
};

/**
 * Creates an external file object for a Notion page.
 * @param {string} externalUrl - The URL of the external file.
 * @returns {ExternalFilePropertyItemObjectResponse} - The Notion external file object.
 */
const createExternalFile = (externalUrl: string): ExternalFilePropertyItemObjectResponse => {
  return {
    type: "external",
    external: {
      url: externalUrl,
    },
  };
};

/**
 * Creates a url property for a Notion page.
 * @param {string} url - The URL string.
 * @param {string} propertyId - The ID of the property.
 * @returns {UrlPropertyItemObjectResponse} - The Notion url property.
 */
const createUrl = (url: string, propertyId = ""): UrlPropertyItemObjectResponse => {
  return {
    type: "url",
    url,
    id: propertyId,
  };
};

/**
 * Creates a relation property for a Notion page.
 * @param {string} relationId - The ID of the related page.
 * @param {string} propertyId - The ID of the property.
 * @returns {RelationPropertyItemObjectResponse} - The Notion relation property.
 */
const createRelation = (relationId: string, propertyId = ""): RelationPropertyItemObjectResponse => {
  return {
    type: "relation",
    relation: [{ id: relationId }],
    id: propertyId,
  };
};

/**
 * Creates a select property for a Notion page.
 * @param {string} selectOption - The option for the select property.
 * @param {string} propertyId - The ID of the property.
 * @returns {SelectPropertyItemObjectResponse} - The Notion select property.
 */
const createSelect = (selectOption: string, propertyId = ""): SelectPropertyItemObjectResponse => {
  return {
    type: "select",
    select: { name: selectOption },
    id: propertyId,
  };
};

/**
 * Creates a multi-select property for a Notion page.
 * @param {string} selectOptions - The comma-separated list of options.
 * @param {string} propertyId - The ID of the property.
 * @returns {MultiSelectPropertyItemObjectResponse} - The Notion multi-select property.
 */
const createMultiSelect = (selectOptions: string, propertyId = ""): MultiSelectPropertyItemObjectResponse => {
  return {
    id: propertyId,
    type: "multi_select",
    multi_select: selectOptions.split(",").map((item) => ({ name: item.trim() })),
  };
};

/**
 * Creates a rich text property for a Notion page.
 * @param {string} richTextContent - The text content.
 * @param {string} propertyId - The ID of the property.
 * @returns {RichTextPropertyItemObjectResponse} - The Notion rich text property.
 */
const createRichText = (richTextContent: string, propertyId = ""): RichTextPropertyItemObjectResponse => {
  return {
    type: "rich_text",
    rich_text: [
      {
        type: "text",
        text: {
          content: richTextContent,
          link: null,
        },
      },
    ],
    id: propertyId,
  };
};

/**
 * Creates a title property for a Notion page.
 * @param {string} titleContent - The title content.
 * @returns {TitlePropertyItemObjectResponse} - The Notion title property.
 */
const createTitle = (titleContent: string): TitlePropertyItemObjectResponse => {
  return {
    type: "title",
    title: [
      {
        type: "text",
        text: {
          content: titleContent,
          link: null,
        },
      },
    ],
    id: "title",
  };
};

const createDatabaseId = (databaseId: string) => {
  return {
    type: "database_id",
    database_id: databaseId,
  };
};

export {
  createNumber,
  createStatus,
  createDate,
  createFiles,
  createExternalFile,
  createUrl,
  createRelation,
  createSelect,
  createMultiSelect,
  createRichText,
  createTitle,
  createDatabaseId,
};
