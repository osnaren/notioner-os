# Notioner OS

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Notion API](https://img.shields.io/badge/Notion%20API-v2-000000?logo=notion)](https://developers.notion.com/)

Notioner OS is a powerful application designed to supercharge your Notion workspace. It provides a suite of tools and automation to streamline your workflow, manage tasks, and create a personalized Notion experience.

## ✨ Features

- **🎬 Cinescape** - Comprehensive movie and series management
  - Track your watchlist and watched content
  - Automatic metadata fetching from TMDB and OMDB
  - Organize by collections, genres, and custom tags
- **🤖 Automated Workflows**
  - Sync data between Notion and external services
  - Scheduled updates and backups
  - Custom automation rules
- **🎨 Customizable Templates**
  - Pre-built templates for various use cases
  - Easy customization options
  - Community template sharing
- **🔌 Extensible Architecture**
  - Plugin system for adding new features
  - Webhook support for integrations
  - Developer-friendly API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or yarn 1.22+
- Notion API key
- TMDB API key (for movie data)
- OMDB API key (for additional movie metadata)

### Installation

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

3. **Configure environment variables**
   Copy `.env.example` to `.env.local` and update the values:

   ```env
   NOTION_AUTH_TOKEN=your_notion_integration_token
   NOTION_MOVIES_DB_ID=your_movies_database_id
   TMDB_API_KEY=your_tmdb_api_key
   OMDB_API_KEY=your_omdb_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

For detailed documentation, please visit our [documentation site](docs/README.md).

- [API Reference](docs/api/README.md)
- [Setup Guide](docs/guides/setup.md)
- [Development Guide](docs/development/README.md)
- [Deployment Guide](docs/deployment/README.md)

## 🛠️ Development

### Code Structure

```
src/
├── app/                # Next.js app router
├── components/         # Reusable UI components
├── features/           # Feature modules
├── lib/                # Shared utilities and API clients
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run test` - Run tests

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Notion](https://www.notion.so/) for their amazing API and platform
- [TMDB](https://www.themoviedb.org/) for comprehensive movie and TV data
- [OMDB](https://www.omdbapi.com/) for additional metadata
- All the amazing open-source contributors
