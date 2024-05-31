import { MOVIES_RELATION_ID, SERIES_RELATION_ID } from "#utils/constants.js";

const createNumber = (value) => {
  return value === "#NUM!" ? null : Number.parseFloat(value);
};

const createStatus = (value) => {
  return { name: value };
};

const createDate = (value) => {
  return { start: value.split("/").reverse().join("-") };
};

const createFiles = (value, title) => {
  return [
    {
      type: "external",
      name: title,
      external: {
        url: value,
      },
    },
  ];
};

const createExternalFile = (url) => {
  return {
    type: "external",
    external: {
      url,
    },
  };
};

const createDatabaseId = (id) => {
  return {
    type: "database_id",
    database_id: id,
  };
};

const createFilesProperty = (name, url) => {
  return {
    type: "files",
    files: [
      {
        name,
        type: "external",
        external: {
          url,
        },
      },
    ],
  };
};

const createRichTextProperty = (content) => {
  return {
    type: "rich_text",
    rich_text: [
      {
        type: "text",
        text: {
          content,
          link: null,
        },
      },
    ],
  };
};

const createRelation = (id) => {
  return {
    type: "relation",
    relation: [
      {
        id,
      },
    ],
  };
};

const createTitleProperty = (content) => {
  return {
    type: "title",
    title: [
      {
        type: "text",
        text: {
          content,
          link: null,
        },
      },
    ],
  };
};


const createSelect = (option) => {
  return { name: option };
};

const createMultiSelect = (list) => {
  return list.split(",").map((item) => ({ name: item.trim() }));
};

const createRichText = (text) => {
  return [
    {
      type: "text",
      text: {
        content: text,
      },
    },
  ];
};

export {
  createNumber,
  createStatus,
  createDate,
  createFiles,
  createExternalFile,
  createDatabaseId,
  createFilesProperty,
  createRichTextProperty,
  createRelation,
  createTitleProperty,
  createSelect,
  createMultiSelect,
  createRichText,
};
