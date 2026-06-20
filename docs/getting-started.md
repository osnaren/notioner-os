# Getting Started with Notioner OS

This guide will walk you through setting up Notioner OS on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v9 or later) or [Yarn](https://yarnpkg.com/) (v1.22 or later)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/notioner-os.git
   cd notioner-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

## Configuration

1. **Obtain API Keys**
   - [Notion Integration Token](https://www.notion.so/my-integrations)
   - [TMDB API Key](https://www.themoviedb.org/settings/api)
   - [OMDB API Key](http://www.omdbapi.com/apikey.aspx)

2. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following content:

   ```env
   # Notion
   NOTION_AUTH_TOKEN=your_notion_integration_token
   NOTION_MOVIES_DB_ID=your_movies_database_id

   # External APIs
   TMDB_API_KEY=your_tmdb_api_key
   OMDB_API_KEY=your_omdb_api_key

   # Optional: Set to 'true' for development
   NODE_ENV=development
   ```

3. **Share your Notion database with the integration**
   - Open your Notion database
   - Click "Share" in the top-right corner
   - Click "Invite" and select your integration

## Running the Application

1. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## Next Steps

- [Explore Features](../features/README.md)
- [Read the API Documentation](../api/README.md)
- [Contribute to Development](../development/README.md)

## Troubleshooting

If you encounter any issues during setup, please check our [Troubleshooting Guide](../guides/troubleshooting.md) or [open an issue](https://github.com/your-username/notioner-os/issues).
