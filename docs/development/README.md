# Development Guide

Welcome to the Notioner OS development guide! This document will help you get started with contributing to the project.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Project Structure](#project-structure)
3. [Coding Standards](#coding-standards)
4. [Testing](#testing)
5. [Git Workflow](#git-workflow)
6. [Deployment](#deployment)

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/notioner-os.git
   cd notioner-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and update the values.

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                # Next.js app router
│   ├── api/            # API routes
│   └── (routes)/       # Page routes
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   └── features/      # Feature-specific components
├── features/           # Feature modules
│   └── movie/         # Movie feature
│       ├── api/       # API integration
│       ├── components/# Feature components
│       └── hooks/     # Custom hooks
├── lib/               # Shared utilities
│   ├── api/          # API clients
│   └── utils/        # Utility functions
└── types/             # TypeScript type definitions
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define types and interfaces in the appropriate `types` directory
- Avoid using `any` type
- Use `interface` for public API definitions and `type` for complex types

### Styling

- Use Tailwind CSS for styling
- Follow the design system defined in `tailwind.config.js`
- Use CSS modules for component-specific styles

### Naming Conventions

- **Files**: Use kebab-case for file names
- **Components**: Use PascalCase for component file names
- **Variables**: Use camelCase
- **Constants**: Use UPPER_SNAKE_CASE

## Testing

We use Jest and React Testing Library for testing.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run coverage report
npm test -- --coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for components
- Test error states and edge cases
- Mock external dependencies

## Git Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push your changes to your fork:
   ```bash
   git push origin your-branch-name
   ```

4. Open a pull request to the `main` branch

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

## Deployment

### Staging

Merging to the `develop` branch will trigger a deployment to the staging environment.

### Production

Merging to the `main` branch will trigger a production deployment.

## Need Help?

- Join our [Discord server](#) (coming soon)
- Open a [GitHub issue](https://github.com/your-username/notioner-os/issues)
- Check the [FAQ](../faq.md)
