# Risk Management

This document uses the Rumsfeld Matrix to organize and assess project risks. It helps us anticipate challenges and prepare accordingly.

---

## The Rumsfeld Matrix

### 1. Known Knowns (Facts)

_These are things we know we know. They are documented facts about the project._

- The application is currently client-side only.
- Data is stored in `localStorage`, which is not secure or shareable.
- The current state management relies on prop drilling.
- The project has a clear roadmap outlined in `README.md`.
- The test environment relies on Node.js's experimental "VM Modules" feature, which could change in future Node.js versions.
- Our version of `react-router-dom` (v6) has upcoming breaking changes in v7, as indicated by test warnings.

### 2. Known Unknowns (Questions)

_These are things we know we don't know. They are questions we need to answer._

- **Scalability**: At what number of artifacts/protocols will the UI performance begin to degrade?
- **User Adoption**: Will the "cost" of documenting errors feel too high for users, leading to abandonment?
- **Data Import Complexity**: How difficult will it be to parse various external dataset formats (e.g., PDF, unstructured web pages)?
- **Metric Accuracy**: Are the current ROI and time-saved calculations truly representative of value, or do they need refinement?
- **Tooling Stability**: When will "VM Modules" become stable in Node.js, and what changes will be required in our test script when that happens?
- **Dependency Migration**: What is the scope of work required to migrate to React Router v7 and adopt its new features (e.g., `v7_startTransition`)?
- **Process Reliability**: How can we continue to automate manual, error-prone steps in our own development process?

### 3. Unknown Knowns (Untapped Knowledge)

_These are things we don't know that we know. This represents knowledge held by users or the team that hasn't been surfaced._

- Users may have already developed their own informal "protocols" that are more effective than what's in the app.
- There may be a "killer feature" (e.g., a specific type of visualization) that would dramatically increase the app's value, but we haven't thought to ask about it.
- The core principles might apply to non-technical domains (e.g., sales, project management) in ways we haven't explored.

### 4. Unknown Unknowns (Contingencies)

_These are things we don't know we don't know. These are the "black swan" events we must be prepared for._

- A major browser update could deprecate `localStorage` or change its behavior, breaking persistence.
- A competing application with a similar philosophy but better execution could emerge.
- The core philosophy of "documenting wrongness" might have unforeseen psychological downsides for some users.
- A critical dependency (e.g., a UI library) could become unmaintained.
