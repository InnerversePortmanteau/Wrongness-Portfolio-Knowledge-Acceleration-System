#!/bin/bash

# Idempotent Configuration Conformance Check
# This script validates the project's configuration against a set of known-good rules,
# turning our learnings from past "wrongness" into automated guardrails.

set -e # Exit immediately if a command exits with a non-zero status.

echo "Running configuration conformance checks..."

EXIT_CODE=0

# Check 1: Ensure index.html exists in the project root.
# This was the root cause of our initial build failures.
if [ ! -f "./index.html" ]; then
  echo "❌ FAILED: index.html not found in project root."
  EXIT_CODE=1
else
  echo "✅ PASSED: index.html exists."
fi

# Check 2: Ensure the script tag in index.html points to the correct entry point.
# This was the root cause of our subsequent build failures.
EXPECTED_SCRIPT_TAG='<script type="module" src="/src/main.tsx"></script>'
if ! grep -qF "$EXPECTED_SCRIPT_TAG" "./index.html"; then
  echo "❌ FAILED: index.html <script> tag is incorrect."
  echo "   Expected to find: $EXPECTED_SCRIPT_TAG"
  EXIT_CODE=1
else
  echo "✅ PASSED: index.html has correct <script> tag."
fi

# Check 3: Ensure the main.tsx entry point file exists.
# This was the root cause of a build failure where the entry file was missing.
ENTRY_POINT_PATH="./src/main.tsx"
if [ ! -f "$ENTRY_POINT_PATH" ]; then
  echo "❌ FAILED: Application entry point not found at '$ENTRY_POINT_PATH'."
  EXIT_CODE=1
else
  echo "✅ PASSED: Application entry point exists."
fi

exit $EXIT_CODE