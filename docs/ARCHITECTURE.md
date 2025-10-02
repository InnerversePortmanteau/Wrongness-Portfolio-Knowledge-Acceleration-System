# Architecture Overview

This document provides a high-level overview of the technical architecture of the Wrongness Portfolio application.

## 1. Core Technology Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: Custom components styled with Tailwind CSS
- **Icons**: Lucide React

## 2. Application Structure

The application is a single-page application (SPA) built with a component-based architecture.

```
src/
├── components/   # Reusable UI components (Tabs, Modals, etc.)
├── hooks/        # Custom React hooks (e.g., usePersistentState)
├── types.ts      # Centralized TypeScript type definitions
└── App.tsx       # Main application shell (root component)
```

### 2.1. State Management

- **Current Strategy**: State is centralized in the root `App.tsx` component.
- **Data Flow**: Data is passed down to child components via props ("prop drilling").
- **State Updates**: Functions to update state (e.g., `handleAddArtifact`) are passed down as props to child components, which call them in response to user events.
- **Persistence**: The `usePersistentState` custom hook is used to automatically persist core data slices (`artifacts`, `datasets`, etc.) to the browser's `localStorage`. This provides a robust single-user experience without a backend.

### 2.2. Component Philosophy

- **Container Component**: `App.tsx` acts as the primary container, responsible for state management, business logic (calculations, data handlers), and rendering the main layout.
- **Presentational Components**: Components within `src/components/` are primarily presentational. They receive data and functions as props and are responsible for rendering the UI.
  - **Tab Components** (`DashboardTab.tsx`, `ArtifactsTab.tsx`, etc.) render the content for each main section.
  - **Modal Components** (`NewArtifactModal.tsx`, etc.) encapsulate form logic for specific actions and are rendered conditionally from the root component.

## 3. Future Architectural Considerations

- **Global State Management**: If the application grows in complexity and prop drilling becomes cumbersome (e.g., passing props through 3+ levels), we will evaluate introducing a lightweight global state manager like Zustand or React's Context API with reducers.
- **Routing**: For features like a dedicated "Artifact Details" page, we will introduce a client-side router like React Router.
- **Data Analysis Module**: To support the "Data-Driven PKM" concept, a future module may be added to handle the import, parsing, and mapping of external datasets. This would likely live in a new `src/services` or `src/lib` directory to keep it separate from the core UI.

## 4. Environment & Configuration

- **Environment Variables**: The project uses Vite's environment variable handling. All configuration variables intended for client-side use must be prefixed with `VITE_`.
- **Secrets Management**: A `.env.example` file is provided as a template. Developers must create a local `.env` file for their configuration. The `.gitignore` file prevents any `.env` files from being committed to the repository, ensuring that secrets are not exposed.
