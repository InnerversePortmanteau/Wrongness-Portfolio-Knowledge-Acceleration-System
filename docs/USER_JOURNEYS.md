# User Journeys & Empathy Mapping

This document explores the different ways users might approach the Wrongness Portfolio and maps their needs to the application's features and documentation.

## User Onramps: The Entry Points

We imagine users arriving with different mindsets. These "onramps" help us design more empathetic user experiences.

### Onramp 1: The Frustrated Debugger

This user arrives in the middle of, or just after, a painful debugging session. They are looking for immediate relief and a way to prevent this specific pain from happening again.

**Empathy Map:**

- **Thinks**: "I just wasted 4 hours. How do I make sure this never happens again? I need a place to dump my notes."
- **Feels**: Frustrated, tired, but also a little enlightened now that the problem is solved.
- **Needs**: A quick, low-friction way to capture the essence of the problem and solution.
- **Pain Points**: Complex forms, having to learn a whole system just to write something down.

**Pointers to User Guide:**

- Direct this user to **Section 2: Managing Artifacts** and **Section 6: Core Actions (New Artifact)** in the `USER_GUIDE.md`. The key is to show them the fastest path from pain to documentation.

### Onramp 2: The Systematic Learner

This user is proactively looking for ways to improve. They are intrigued by the system's philosophy and want to build a robust knowledge base over time.

**Empathy Map:**

- **Thinks**: "This is a cool system. How do I get started? What's the best way to mine knowledge from books and articles I'm already reading?"
- **Feels**: Curious, motivated, organized.
- **Needs**: A clear, structured process for building their portfolio and a way to measure their progress.
- **Pain Points**: A system with no clear starting point or feedback loop.

**Pointers to User Guide:**

- Direct this user to **Section 3: Managing Datasets** and **Section 5: The Mining Workflow**. They will appreciate the structured approach to "Quick Add" presets and the session timer.

### Onramp 3: The Data-Driven Analyst

This user is focused on metrics and ROI. They want to quantify the value of their learning and identify which activities yield the highest return.

**Empathy Map:**

- **Thinks**: "How can I prove to myself or my manager that this is a good use of time? Which of my protocols are actually working?"
- **Feels**: Analytical, skeptical, results-oriented.
- **Needs**: Clear, easy-to-understand dashboards and metrics.
- **Pain Points**: Vague or vanity metrics that don't reflect real-world impact.

**Pointers to User Guide:**

- Direct this user to **Section 1: The Dashboard** and **Section 4: The Protocol Library**. They will be most interested in the "Time Saved" and "Success Rate" metrics and the "Log Protocol Use" workflow.

## Integrating Journeys into the Application

This empathy-driven approach can be integrated directly into the application's architecture and UI:

- **Architecture**: The separation of concerns allows us to build features tailored to each journey. For example, the "Frustrated Debugger" benefits most from the simple `NewArtifactModal`, while the "Systematic Learner" benefits from the more complex `MiningTab`.
- **UI/UX**: The app could feature "empty states" or onboarding tooltips that ask, "What brought you here today?" and then guide the user toward the most relevant feature set based on their answer (e.g., "Just finished a tough bug?" -> "Create an Artifact").
- **Documentation**: The `README.md` and `USER_GUIDE.md` can be structured to speak directly to these user journeys, making the documentation more relatable and effective.
