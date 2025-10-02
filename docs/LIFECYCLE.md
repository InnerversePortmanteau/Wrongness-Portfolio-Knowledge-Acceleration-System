# Development & Quality Assurance Lifecycle

This document outlines the development lifecycle for the Wrongness Portfolio project and maps software testing methodologies to each phase to ensure high quality.

## Development Lifecycle Phases

Our development process is iterative and follows these distinct phases for any given feature or enhancement.

### Phase 1: Requirement Definition & Design

- **Activities**:
  - The Human Developer defines a feature request or objective.
  - The AI Assistant consults, clarifies, and helps structure the request.
  - Together, we agree on the scope, potential UI/UX changes, and architectural impact.
- **Documentation**: The cycle is logged in `docs/DEVELOPMENT_LOG.md`. Architectural changes are noted in `docs/ARCHITECTURE.md` and `docs/DECISION_LOG.md`.
- **Quality Process**: **Static Testing**. We review the requirements and design for clarity, feasibility, and alignment with user journeys before any code is written.
- **Root Cause Analysis (for bugs/issues)**: For any recurring obstacle or significant bug, we will perform a **Fishbone (Ishikawa) Analysis** to explore systemic causes across categories (e.g., the 6 Ms: Machine, Method, Material, Manpower, Measurement, Environment). The findings will be logged in the corresponding `DEVELOPMENT_LOG.md` entry.

### Phase 2: Implementation & Unit Testing

- **Activities**:
  - The AI Assistant writes the primary application code (React components, hooks, etc.) based on the defined requirements.
  - The AI Assistant also writes corresponding **Unit Tests** for any new, complex, or critical logic (e.g., utility functions, scoring algorithms). This is a form of **White-Box Testing**.
  - **Cleanup**: When refactoring or replacing files, this phase includes the explicit deletion of any obsolete files to prevent configuration conflicts.
  - **File Placement Verification**: All new files must be placed in the correct directory as defined in `docs/ARCHITECTURE.md`.
- **Quality Process**:
  - **Unit Testing**: Verifies that individual components or functions work in isolation. For example, testing `calculateDatasetScore()` with various inputs to ensure it returns the correct score.

### Phase 3: Integration & System Testing

- **Activities**:
  - The Human Developer integrates the new code into the application by applying the provided diffs.
  - The application is run locally to observe the new feature in the context of the entire system.
- **Quality Process**:
  - **Integration Testing**: Manually verifying that new components work together. For example, ensuring the "New Artifact" button correctly opens the `NewArtifactModal` and that saving the modal's form correctly updates the state that is passed to the `ArtifactsTab`.
  - **System Testing**: Evaluating the end-to-end flow. Does the entire user journey work as expected?
  - **Smoke Testing**: A quick check to ensure the main features (e.g., app loading, navigation, core data display) are not broken after the change.

### Phase 4: Acceptance & Regression Testing

- **Activities**:
  - The Human Developer acts as the end-user to validate the feature.
  - The Human Developer performs a final review before committing the code.
- **Quality Process**:
  - **Acceptance Testing (UAT)**: You, the developer, confirm that the feature meets the original requirement and is acceptable for "release" (i.e., committing to `main`).
  - **Regression Testing**: Manually checking 1-2 related, existing features to ensure they haven't been negatively impacted. For example, after adding the "View Details" page, we would quickly check that creating a new artifact still works.
  - **Usability Testing**: As the primary user, you assess if the new feature is intuitive and easy to use.

### Phase 5: Documentation & Commit

- **Activities**:
  - The AI Assistant drafts updates for all relevant documentation (`USER_GUIDE.md`, `ENHANCEMENT_SUMMARY.md`, etc.).
  - The AI Assistant generates a descriptive git commit message.
  - The Human Developer reviews the documentation, stages all files, and executes the commit.
- **Quality Process**: **Documentation Review**. Ensuring that the project's "memory" is accurate and up-to-date.
- **Quality Process**: **Dependency Health Review**. Reviewing test output for new warnings and periodically running `npm audit` to identify vulnerabilities or deprecations in our dependencies.

## Future of Testing in This Project

- **Automated Testing**: As the application grows, we will introduce automated testing frameworks (like Jest and React Testing Library) to automate Unit and Integration tests. This will make our Regression Testing process far more robust.
- **Non-Functional Testing**:
  - **Performance Testing**: As we approach a larger number of artifacts, we will use browser developer tools to profile rendering performance and optimize as needed.
  - **Compatibility Testing**: Currently, we are implicitly testing on a single browser. Before a wider release, we would need to formalize testing across major browsers (Chrome, Firefox, Safari).
  - **Security Testing**: Since the app is client-side only, security risks are minimal. However, if we add a backend, a full security audit will become a critical part of the lifecycle.

This lifecycle provides a structured approach to ensure that every feature we add is not only functional but also well-documented, reliable, and high-quality.
