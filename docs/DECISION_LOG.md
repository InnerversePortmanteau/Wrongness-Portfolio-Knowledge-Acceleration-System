# Architectural Decision Log

This log records key architectural decisions made during the project's development. Each entry provides context, the decision, and its consequences.

---

## ADR-002: Centralized State Management via Prop Drilling

- **Date**: 2023-10-27
- **Status**: Accepted
- **Context**: The application requires state to be shared across multiple components (e.g., the `protocols` array is needed by the Dashboard, Protocols tab, and the Log Protocol Use modal). We needed a simple, initial approach for state management.
- **Decision**: We will use a centralized state management pattern where all major state slices are held in the root `App.tsx` component. State and state-updating functions will be passed to child components via props.
- **Consequences**:
  - **Pros**: Simple to implement and understand. Avoids adding external dependencies for state management. Enforces a clear, top-down data flow.
  - **Cons**: Can lead to "prop drilling" where props are passed through many intermediate components. May become cumbersome as the application grows.
  - **Mitigation**: If prop drilling becomes a significant issue (passing through 3+ levels), we will revisit this and consider a global state manager (see `ARCHITECTURE.md`).

---

## ADR-001: Initial Persistence via Local Storage

- **Date**: 2023-10-25
- **Status**: Accepted
- **Context**: The application needs to persist user data between sessions to be useful. We needed a solution that did not require a backend database or complex setup for the initial phases.
- **Decision**: We will use the browser's `localStorage` for all data persistence. A custom hook, `usePersistentState`, was created to abstract this logic and provide a `useState`-like API.
- **Consequences**:
  - **Pros**: Extremely fast to implement. Works offline. Zero dependencies. Perfect for a single-user, client-side application.
  - **Cons**: Data is tied to a single browser on a single machine. Not suitable for data sharing, synchronization, or large datasets. Data can be lost if the user clears their browser data.
  - **Mitigation**: This approach is suitable for Phase 1 & 2. If collaborative features are introduced in Phase 3, a proper backend and database (e.g., Firebase, Supabase, or a custom API) will be required.
