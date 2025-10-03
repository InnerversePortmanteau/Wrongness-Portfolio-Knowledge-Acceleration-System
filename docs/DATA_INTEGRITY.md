# Data Integrity Policy

This document outlines our philosophy and approach to ensuring the integrity of the data within the Wrongness Portfolio.

## 1. Defining "Incorrectness"

Data incorrectness in this system falls into two primary categories:

1.  **Verifiably Incorrect Data**: Data that can be proven false against an objective, external source of truth.

    - _Example_: An incorrect date (`2023-11-18` when it is actually `2025-11-01`).
    - _Example_: A calculation error in a metric (e.g., `2 + 2 = 5`).

2.  **Subjectively "Wrong" Data**: Data that represents a flawed human model, opinion, or recollection. This is the "wrongness" the portfolio is designed to capture.
    - _Example_: The content of the `wrongModel` field in an artifact. This is _supposed_ to be wrong.
    - _Example_: A low "confidence" rating on a protocol that later proves to be highly effective.

**Our core challenge is to build a system that rigorously validates the first category while faithfully capturing and analyzing the second.**

## 2. Data Categorization and Integrity Strategy

We can categorize our data to apply different integrity strategies.

| Data Category | Description | Integrity Risk | Current & Future Mitigation Strategy - **Current**: The `create...` utility functions automatically generate IDs, preventing duplicates and ensuring format consistency.

- **Future**: Implement checksums or more robust unique identifiers if data is ever moved to a distributed system. |
  | **System-Generated Data** | Data created automatically by the system (e.g., artifact IDs, timestamps). | High (if automated correctly). The risk is in the automation logic itself. | **Current**: The `create...` utility functions automatically generate IDs, preventing duplicates and ensuring format consistency. The `gather-context.js` script now sources the date automatically.
- **Future**: Implement checksums or more robust unique identifiers if data is ever moved to a distributed system. |
  | **Calculated Data** | Metrics derived from other data points (e.g., `successRate`, `ROI`). | Medium. The risk is a flaw in the calculation logic. | **Current**: All calculation logic is extracted into pure functions in `src/utils/` and is covered by unit tests. This makes the logic verifiable and protected against regressions.
- **Future**: Add more complex validation tests and potentially cross-reference calculations. |
  | **User-Input (Categorical)** | Data selected from a predefined set (e.g., `status`, `confidence`, `category`). | Low. The risk is a user selecting a "wrong" but valid option. | **Current**: UI controls like `<select>` dropdowns constrain user input to valid options.
- **Future**: The system could suggest a category based on the content of other fields, guiding the user toward a more accurate choice. |
  | **User-Input (Free-Text)** | The core qualitative data (e.g., `title`, `wrongModel`, `signal`, `rebuild`). | N/A (for subjective correctness). This data is _meant_ to be a snapshot of a human mental state. The integrity risk here is not that it's "wrong," but that it's _unclear_ or _incomplete_. | **Current**: The UI provides clear labels and placeholders to guide the user.
- **Future**: Implement AI-assisted analysis to detect ambiguity, suggest clarifications, or identify when a "Rebuild" field doesn't seem to logically follow from the "Signal." This moves from validating correctness to validating _coherence_. |

## 3. The Human-in-the-Loop Blind Spot

Our recent experience with dates revealed a key principle: **A process that relies on a human to perform a repetitive, automatable task is a flawed process.**

- **The Blind Spot**: We assumed the human could be a reliable source for objective data like the current date.
- **The Learning**: The system should be designed to source objective, verifiable data from the most reliable, automated source possible (e.g., the machine's clock, an API). The human's role should be focused on providing the subjective, qualitative data that only they possess.

By categorizing our data and understanding our blind spots, we can build a more resilient system that is both a faithful record of human learning and a reliable source of analytical data.
