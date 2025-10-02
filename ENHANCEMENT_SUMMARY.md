# Enhancement Summary

This document provides a high-level, reverse-chronological summary of all major enhancements made to the Wrongness Portfolio application since its inception.

---

### 2023-10-27

**Feature: Artifact Search and Filtering**

- Added a search bar and status filter to the `Artifacts` tab to allow for easy navigation of the artifact library.
- The search is case-insensitive and covers the artifact's ID, title, domain, and category.
- The filtering logic is memoized for performance.

**Feature: Functional Dataset Presets**

- The "Quick Add" buttons on the `Datasets` tab are now functional, allowing users to add recommended datasets with a single click.

### 2023-10-26

**Feature: Data Creation Workflows**

- Implemented a modal for adding new **Datasets**, including priority scoring sliders.
- Implemented a modal for logging **Protocol Use**, which automatically recalculates and updates protocol metrics (`timesApplied`, `successRate`, `avgTimeSaved`).
- Implemented a modal for creating new **Artifacts**.

**UI Refinement: Floating Action Button (FAB)**

- Refactored the FAB into a popover menu to provide a cleaner, more organized UI for quick actions.

### 2023-10-25

**Feature: Local Persistence**

- Created a `usePersistentState` custom hook to automatically save application state to the browser's `localStorage`.
- Applied the hook to all core data slices (`artifacts`, `datasets`, `protocols`, `miningQueue`), ensuring user data persists across sessions.

### 2023-10-24

**Refactor: Component Modularity**

- Decomposed the monolithic main application component into smaller, dedicated components for each tab (`DashboardTab`, `ArtifactsTab`, etc.).
- Introduced a central `src/types.ts` file to provide strong typing for all data models, improving code quality and maintainability.

### Project Inception

- Initial commit with a single-file React component (`wrongness-portfolio-app.tsx`) serving as a visual prototype.
