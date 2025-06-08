# Contributing to @headless-primitives/react

First of all, thank you for considering contributing to @headless-primitives/react! Your contributions help make this project better.

## How to Contribute

### Reporting Issues

1. Check if the issue has already been reported
2. Create a new issue with:
   - A clear and descriptive title
   - A detailed description of the problem
   - Steps to reproduce the issue (if applicable)
   - Your operating system and Node.js version

### Submitting Changes

1. Fork the repository
2. Create a descriptive feature branch (e.g., `fix/hotkeys`)
3. Make your changes
4. Add tests if applicable
5. Update documentation if needed
6. Commit your changes following our commit message conventions
7. Push to your fork
8. Create a Pull Request

## Commit Message Conventions

We follow a structured commit message format to help maintain a clear changelog. Please use the following format:

```
<type>(<scope>): <description>
```

Where:
- `<type>` is one of: `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, or `chore`
- `<scope>` is the affected package or component (e.g., `converter`, `cli`, `web`, or specific component name)
- `<description>` is a concise description of the change

Example commit messages:
- `feat: add support for new component type`
- `fix: resolve component installation issue`
- `docs: update contributing guidelines`
- `refactor: improve class name extraction`

### Commit Message Types

- `feat`: New features or functionality
- `fix`: Bug fixes
- `refactor`: Code changes that neither fix a bug nor add a feature
- `docs`: Documentation changes
- `build`: Changes that affect the build system or external dependencies
- `test`: Adding missing tests or correcting existing tests
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Branch Naming

Please use lowercase, hyphen-separated branch names that clearly indicate the purpose of the changes. For example:
- `feat/add-useAsyncTask`
- `fix/hotkeys`
- `docs/update-readme`

### Pull Request Guidelines

- PRs should be focused and address a single issue
- Include tests if you're adding new functionality
- Update documentation if needed
- Follow the existing code style
- Ensure all tests pass

## Development Setup

1. Fork the repository on GitHub
   - Click the "Fork" button in the top-right corner of the repository page
   - Choose where to fork the repository (your GitHub account)

2. Clone your fork to your local machine:
```bash
gh repo clone robbiecren07/headless-primitives
```

3. Set up the upstream repository:
```bash
cd headless-primitives
gh repo set-upstream headless-primitives/headless-primitives
```

4. Install dependencies:
```bash
npm install
```

5. Build the packages:
```bash
npm run build
```

6. Run tests:
```bash
npm test
```

## Code Style

- Follow TypeScript best practices
- Use consistent naming conventions
- Keep functions small and focused
- Write clear and concise comments
