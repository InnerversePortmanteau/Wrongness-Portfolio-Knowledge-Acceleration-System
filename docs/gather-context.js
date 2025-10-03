const fs = require("fs");
const path = require("path");

// List of all documentation files that serve as our project's "memory"
const contextFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "docs/ARCHITECTURE.md",
  "docs/DECISION_LOG.md",
  "docs/DATA_INTEGRITY.md",
  "docs/DEVELOPMENT_LOG.md",
  "docs/LIFECYCLE.md",
  "docs/RASCI_MATRIX.md",
  "docs/RISK_MANAGEMENT.md",
  "docs/USER_JOURNEYS.md",
  "ENHANCEMENT_SUMMARY.md",
  "test-results.log",
];

const today = new Date().toISOString().split("T")[0];

console.log(`--- GATHERING PROJECT CONTEXT (Date: ${today}) ---`);
console.log(`Date: ${today}`);

let fullContext = "";

contextFiles.forEach((file) => {
  try {
    const filePath = path.join(__dirname, "..", file);
    const content = fs.readFileSync(filePath, "utf8");
    fullContext += `\n\n--- FILE: ${file} ---\n\n`;
    fullContext += content;
  } catch (error) {
    console.error(`Error reading file ${file}:`, error.message);
  }
});

console.log(fullContext);
console.log(
  "\n--- CONTEXT GATHERED. Please copy the text above and paste it into the Gemini chat. ---"
);
