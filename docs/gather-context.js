const fs = require("fs");
const path = require("path");

// List of all documentation files that serve as our project's "memory"
const contextFiles = [
  "README.md",
  "docs/ARCHITECTURE.md",
  "docs/DECISION_LOG.md",
  "docs/DEVELOPMENT_LOG.md",
  "docs/RASCI_MATRIX.md",
  "docs/RISK_MANAGEMENT.md",
  "docs/USER_JOURNEYS.md",
  "ENHANCEMENT_SUMMARY.md",
];

console.log("--- GATHERING PROJECT CONTEXT ---");

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
