# Wrongness Portfolio

> A systematic knowledge acceleration system that transforms errors into permanent upgrades

## Overview

The Wrongness Portfolio is a structured framework for documenting, analyzing, and learning from mistakes, debugging sessions, and problem-solving experiences. Rather than treating errors as ephemeral frustrations, this system treats them as high-quality data sources for building better mental models and protocols.

**Core Principle**: The value of an insight is multiplied by its documentation. An undocumented solution is a one-time fix; a documented process is a permanent system upgrade.

## What This Is

- **A knowledge management system** for capturing "wrongness" - the moments when your mental models fail
- **A protocol library** that extracts reusable procedures from debugging experiences
- **A dataset mining tool** that accelerates learning by systematically extracting patterns from existing postmortems, incident reports, and technical documentation
- **A measurement framework** that quantifies the value of knowledge through time saved and success rates

## What This Is Not

- Not a bug tracker (use Jira, GitHub Issues, etc. for that)
- Not a journal or diary (though it may feel therapeutic)
- Not a blame system (it's explicitly about learning, not accountability)
- Not a replacement for documentation (it's a complement that captures the _why_ behind decisions)

## Key Features

### 1. Artifact System

Each "artifact" documents a complete wrongness → learning cycle:

- **The Context**: Initial state and problem
- **The Wrongness**: Flawed mental model or assumptions
- **The Signal**: Data that revealed the flaw
- **The Rebuild**: Corrected model, extracted protocols, and a root cause analysis (using frameworks like the Fishbone Diagram) to identify systemic issues.
- **The Result**: Measurable improvement

### 2. Protocol Library

Extracted, reusable procedures that can be applied across similar problems:

- Success rate tracking
- Time-saved metrics
- Confidence intervals (high/medium/low)
- Application contexts and boundary conditions

### 3. Dataset Mining System

Accelerate learning by systematically extracting patterns from:

- Postmortem databases (Google SRE, GitLab, Stripe)
- Stack Overflow high-vote questions
- GitHub issue archaeology
- Technical books and research papers

Includes prioritization scoring: `(Relevance × 3) + (Signal Density × 2) + (Transferability × 2)`

### 4. ROI Tracking

Measure the return on knowledge investment:

```
Dataset ROI = (Validated Protocols × Avg Time Saved) / Time Invested
Protocol Value = Times Applied × Avg Time Saved
```

## Project Structure

```
wrongness-portfolio/
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── App.jsx          # Main application
├── artifacts/           # Stored artifact documents
│   ├── WP-001.md       # Example: Debugging artifact
│   └── templates/      # Artifact templates
├── protocols/          # Protocol library
│   ├── diagnostic/     # Diagnostic protocols
│   └── problem-solving/ # Problem-solving protocols
├── datasets/           # Dataset tracking
│   ├── sources.json    # Dataset metadata
│   └── extractions/    # Extracted patterns
├── docs/              # Documentation
│   ├── getting-started.md
│   ├── artifact-guide.md
│   └── mining-guide.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A willingness to document your mistakes
- Intellectual humility (the foundation of learning)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wrongness-portfolio.git
cd wrongness-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Your First Artifact

1. **Identify a recent frustrating debugging session** (the more frustrating, the better the data)
2. Click the **New Artifact** button in the header or in the floating action menu.
3. Fill in the template:
   - What was your initial approach? (The Wrong Model)
   - What data indicated it was wrong? (The Signal)
   - What did you learn? (The Correct Model)
   - What protocol emerged? (The Rebuild)
4. **Tag it with confidence levels** for each protocol
5. **Apply it to a real problem** to validate

### Your First Mining Session

1. Navigate to **Datasets** → **Add Dataset**
2. Start with a high-priority source (e.g., Google SRE Postmortems)
3. Go to **Mining** tab → **Start Session Timer**
4. Read 3-5 postmortems and use the **Quick Extraction Form** for each
5. Track your extraction rate (goal: <20 min per pattern initially)
6. After 5 patterns, synthesize into a new artifact

## Usage Patterns

### Daily Practice (15 minutes)

- Log any debugging session that took >30 minutes
- Review one existing protocol and look for improvement opportunities
- Check dashboard for protocol success rates

### Weekly Review (30 minutes)

- Mine 5 patterns from your highest-priority dataset
- Create or update one artifact
- Review weekly mining goals and adjust

### Monthly Synthesis (2 hours)

- Look for meta-patterns across artifacts
- Update confidence levels based on validation data
- Calculate ROI on datasets and double down on high performers
- Archive or sunset protocols that no longer apply

### Quarterly Deep Dive (4 hours)

- Create a "meta-artifact" identifying recurring themes
- Build new protocol categories
- Evaluate which wrongnesses you've stopped making (success!)
- Present learnings to team (optional but valuable)

## Key Metrics to Track

- **Total artifacts created**: Measure of documented learning
- **Total protocols extracted**: Reusable knowledge generated
- **Total time saved**: Cumulative impact across all protocol applications
- **Protocol success rate**: Average effectiveness of your protocols
- **Dataset ROI**: Return on mining time invested
- **Extraction velocity**: Patterns extracted per hour (improving over time)

## Philosophy & Principles

### 1. Ignorance is Structured, Not Neutral

Our "not-knowing" is not a blank slate. It is a structured landscape shaped by our existing mental models, biases, and the systems we operate in. The goal is not to achieve a "blank" state, but to make this invisible landscape and its features visible.

### 2. Obstacles are Multi-Layered

The path to learning is blocked by more than just simple mistakes. We must learn to identify different categories of obstacles: from conscious **examinable assumptions**, to the **un-examinable assumptions** of our core frameworks, to **conceptual voids** where we lack the words to even ask the right question.

### 3. Wrongness is the Signal of a Deeper Structure

A persistent error or frustration is not a failure of code, but a high-quality signal that our underlying model of the system is flawed. We don't just fix the bug; we use the signal to rebuild the model.

### 4. Documentation is the Act of Rebuilding

The value of an insight is multiplied by its documentation. An undocumented solution is a one-time fix; a documented learning cycle is a permanent upgrade to the system's intelligence.

### 5. Some Blindness is Functional

Not all assumptions should be examined. Some are "enabling fictions" that allow us to proceed without being paralyzed by infinite questioning. The goal is to distinguish between the assumptions that obstruct learning and those that enable it.

## Example Artifacts

### WP-001: I Was Wrong About Debugging

**Domain**: Software Engineering  
**Problem**: ImportError despite package being installed  
**Wrong Model**: "The error message points to the problem's source"  
**Correct Model**: "System-First Protocol" - verify environment integrity before touching code  
**Protocols Extracted**: 4  
**Time Saved**: 360 minutes (8 applications × 45 min avg)  
**Status**: Evergreen

### WP-002: I Was Wrong About Communication (Example)

**Domain**: Team Collaboration  
**Problem**: Feature requirements kept changing  
**Wrong Model**: "Stakeholders don't know what they want"  
**Correct Model**: "Show, don't tell" - build prototypes before specification  
**Protocols Extracted**: 3  
**Status**: Active

## Roadmap

### Phase 1: Foundation (Current)

- [x] Core artifact structure
- [x] Protocol library
- [x] Dataset prioritization system
- [x] Basic metrics tracking

### Phase 2: Enhancement (Next 3 months)

- [x] Full-text search across artifacts
- [x] Pattern tagging and categorization
- [ ] Export to PDF/Markdown
- [x] Local storage persistence
- [ ] Dataset import tools (URL → extraction)

### Phase 3: Intelligence (6+ months)

- [ ] Graph visualization of protocol relationships
- [ ] Pattern recognition across artifacts
- [ ] AI-assisted categorization
- [ ] Collaborative features (team sharing)
- [ ] Mobile app for quick logging

## Contributing

This is a personal knowledge management system, but the framework is designed to be transferable. Contributions welcome:

1. **Share your artifacts** (anonymized) to build a pattern library
2. **Suggest new protocol categories** based on your domain
3. **Add dataset sources** with extraction templates
4. **Improve the scoring algorithms** for datasets and protocols
5. **Build integrations** with other tools (Notion, Obsidian, etc.)

## License

MIT License - Use this framework however helps you learn faster.

## Acknowledgments

Inspired by:

- **James Reason**: Swiss Cheese Model of accident analysis
- **Daniel Kahneman**: Thinking, Fast and Slow
- **Donella Meadows**: Thinking in Systems
- **Google SRE**: Blameless postmortem culture
- **Sidney Dekker**: The Field Guide to Understanding Human Error
- Every developer who has ever spent 4 hours debugging a typo

## Contact

Questions? Suggestions? Built something cool with this framework?

Open an issue or reach out directly.

---

**Remember**: The goal isn't to never be wrong. The goal is to be wrong about different things each time, and to document the journey so you never make the same mistake twice.

_"The value of an insight is multiplied by its documentation."_
