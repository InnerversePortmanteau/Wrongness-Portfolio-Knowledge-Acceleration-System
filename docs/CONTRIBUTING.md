# Contributing to the Wrongness Portfolio

First off, thank you for considering contributing! This project is built on the idea of collaborative learning, and your input is valuable.

## Development Setup

To get the project running locally for development and testing, please follow these steps.

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1.  **Clone the repository:**
    _(If you haven't already)_

    ```bash
    git clone https://github.com/yourusername/wrongness-portfolio.git
    cd wrongness-portfolio
    ```

2.  **Install dependencies:**
    This command reads the `package.json` file and installs all the necessary libraries for the application and for development (like React, Jest, etc.).

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file to create your local configuration.
    ```bash
    cp .env.example .env
    ```

### Running the Application

To start the local development server (usually on `http://localhost:5173`):

```bash
npm run dev
```

### Running Tests

We use Jest and React Testing Library for automated testing. To run the test suite:

```bash
npm test
```

This command executes all files ending in `.test.tsx` and provides a summary of the results.

## Contribution Workflow

1.  **Provide Context**: Before starting a new development cycle, run the "Gemini: Load Project Context" task in VS Code and paste the output into our chat.
    - **How to run the task**:
      1. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS).
      2. Type `Tasks: Run Task`.
      3. Select `Gemini: Load Project Context`.
      4. The full project context will be copied to your clipboard. Paste this as the first part of your request.
2.  **Define the Feature**: Clearly state the goal for the new feature or bug fix.
3.  **Implement & Test**: We will work together to write the code and corresponding unit tests. The "Load Project Context" task automatically includes the current date, so there is no need to provide it manually.
4.  **Validate**: Perform manual acceptance and regression testing as outlined in our `docs/LIFECYCLE.md`.
5.  **Document & Commit**: I will generate the documentation updates and commit message. You will review and commit the changes.

## Code of Conduct

This project adheres to a code of conduct that respects intellectual humility and a focus on learning. All contributions should be made in a spirit of constructive collaboration. The goal is not to be right, but to arrive at the right solution together.

## Coding Style & Conventions

To maintain clarity and prevent tooling issues, we adhere to the following conventions:

- **Explicit Test Imports**: When importing a component into its corresponding test file, always include the file extension (e.g., `import MyComponent from './MyComponent.tsx'`). This prevents ambiguity in Jest's module resolver.
