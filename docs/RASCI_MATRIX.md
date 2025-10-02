# RASCI Matrix: Human-AI Collaboration

This document defines the roles and responsibilities between the Human Developer (You) and the AI Code Assistant (Gemini) for key activities in this project's lifecycle.

## Roles

- **R (Responsible)**: The one who "does" the work.
- **A (Accountable)**: The one who "owns" the work and has final approval. The buck stops here.
- **S (Supportive)**: Provides resources or assistance to the Responsible party.
- **C (Consulted)**: Provides input, expertise, or clarification (two-way communication).
- **I (Informed)**: Kept up-to-date on progress (one-way communication).

## Matrix

| Activity / Task                         | Human Developer (You) | AI Assistant (Gemini) | Notes                                                                                               |
| --------------------------------------- | :-------------------: | :-------------------: | --------------------------------------------------------------------------------------------------- |
| **1. Define Requirements & Features**   |         A, R          |           C           | You own the vision and define what to build. I help clarify, brainstorm, and structure the request. |
| **2. Architectural Design & Decisions** |         A, R          |         S, C          | You make the final call. I propose solutions, explain trade-offs, and draft decision logs (ADRs).   |
| **3. Write Application Code**           |           A           |         R, S          | I write the code based on your request. You are accountable for reviewing and accepting it.         |
| **4. Write Unit/Integration Tests**     |           A           |           R           | I can and should generate tests for the code I produce to ensure quality.                           |
| **5. Update User-Facing Docs**          |           A           |           R           | I will automatically draft updates for `USER_GUIDE.md`, etc., based on new features.                |
| **6. Update Process Docs**              |           A           |           R           | I am responsible for updating the `DEVELOPMENT_LOG.md` and `ENHANCEMENT_SUMMARY.md`.                |
| **7. Code Refactoring & Quality**       |           A           |         R, C          | I will proactively identify and perform refactoring, but you must approve the changes.              |
| **8. Commit Code (Git)**                |         A, R          |           S           | You execute the git commands. I support this by generating high-quality commit messages.            |
| **9. Identify & Manage Risks**          |           A           |         S, C          | You own the risk strategy. I support by helping populate the `RISK_MANAGEMENT.md` matrix.           |
| **10. Deploy Application**              |         A, R          |           I           | This is currently outside my scope. I am only informed by the context you provide.                  |
