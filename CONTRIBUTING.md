# Contributing to Notioner OS

Thank you for your interest in contributing to Notioner OS! We appreciate your time and effort in helping us improve this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code Style Guide](#code-style-guide)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine
   ```bash
   git clone https://github.com/your-username/notioner-os.git
   cd notioner-os
   ```
3. **Set up the development environment**
   ```bash
   npm install
   cp .env.example .env.local
   ```
4. **Create a new branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-short-description
   ```

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the [issues](https://github.com/your-username/notioner-os/issues)
- If not, open a new issue with a clear title and description
- Include steps to reproduce, expected behavior, and actual behavior
- Add screenshots or error messages if applicable

### Suggesting Enhancements

- Check if the enhancement has already been suggested
- Open a new issue with a clear description of the enhancement
- Explain why this enhancement would be useful
- Include any relevant examples or mockups

### Your First Code Contribution

Looking for your first contribution? Check out issues with the `good first issue` label.

## Development Workflow

1. **Sync your fork** with the main repository

   ```bash
   git remote add upstream https://github.com/your-username/notioner-os.git
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a new branch** for your feature or bugfix

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit them

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push your changes** to your fork

   ```bash
   git push -u origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Go to the [Pull Requests](https://github.com/your-username/notioner-os/pulls) page
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Submit the PR

## Pull Request Process

1. Ensure all tests pass
2. Update the documentation if needed
3. The PR will be reviewed by maintainers
4. Address any feedback or requested changes
5. Once approved, your PR will be merged

## Code Style Guide

- Follow the existing code style
- Use TypeScript for all new code
- Write meaningful commit messages
- Keep PRs focused and small
- Add tests for new features and bug fixes

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples:

```
feat(auth): add login with Google

- Add Google OAuth integration
- Update login page with Google button

Closes #123
```

## Need Help?

If you need help or have questions, please open an issue or join our [Discord community](#) (coming soon).

Thank you for contributing to Notioner OS! 🎉
