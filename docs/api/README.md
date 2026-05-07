# API Reference

This document provides detailed information about the Notioner OS API, including available endpoints, request/response formats, and authentication.

## 🔐 Authentication

All API requests require authentication using a Notion integration token. Include the token in the `Authorization` header:

```http
Authorization: Bearer your_notion_integration_token
```

## Base URL

```
/api
```

## Endpoints

### Movies

#### Get All Movies

```http
GET /api/movie
```

**Response**
```json
{
  "results": [
    {
      "id": "page_id",
      "title": "Inception",
      "year": 2010,
      "poster": "https://image.tmdb.org/t/p/w500/...",
      "rating": 8.8
    }
  ],
  "has_more": false,
  "next_cursor": null
}
```

#### Add a New Movie

```http
POST /api/movie
Content-Type: application/json

{
  "title": "The Shawshank Redemption",
  "year": 1994
}
```

**Response**
```json
{
  "id": "new_page_id",
  "url": "https://www.notion.so/..."
}
```

## Error Handling

Errors follow the standard HTTP status codes:

- `200 OK` - Request successful
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error response format:
```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse. The current limits are:

- 60 requests per minute per IP address
- 1000 requests per day per API key

## Webhooks

Coming soon. Webhooks will be available for real-time updates.
