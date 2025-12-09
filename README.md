# AI vs. AI: Building Resilient Enterprises in the Age of Autonomous Threats

[![Release](https://img.shields.io/github/v/release/the-cyber-boardroom/Presentation__BlackHat-EU__Dec-2025)](https://github.com/the-cyber-boardroom/Presentation__BlackHat-EU__Dec-2025/releases/tag/v2.0.0)
[![Python](https://img.shields.io/badge/python-3.12-blue)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-009688)](https://fastapi.tiangolo.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange)](https://aws.amazon.com/lambda/)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)
[![CI Pipeline - DEV](https://github.com/the-cyber-boardroom/presentation_blackhat_eu_dec_2025/actions/workflows/ci-pipeline__dev.yml/badge.svg)](https://github.com/the-cyber-boardroom/presentation_blackhat_eu_dec_2025/actions)

> **Presented at Black Hat Europe 2025 – AI Security Summit**  
> December 9, 2025 | ExCeL London

This repository contains the complete presentation materials, research documents, and web-based slide system for the AI Security Summit keynote delivered at Black Hat Europe 2025.

---

## 📋 Session Overview

**Title:** AI vs. AI: Building Resilient Enterprises in the Age of Autonomous Threats  
**Speaker:** [Dinis Cruz](https://blackhat.com/eu-25/summit-sessions/schedule/speakers.html#dinis-cruz-52392) – GenAI Entrepreneur & Former CISO  
**Organizations:** Akeia.ai / The Cyber Boardroom / MyFeeds.ai  
**Date:** Tuesday, December 9, 2025 | 9:10am–9:35am  
**Location:** ICC Maritime Suite, Victoria 4, Level 3  
**Track:** AI Security Summit

### Abstract

AI-powered threats aren't just about external adversaries: the biggest risks may come from within. Enterprise systems weren't built for autonomous agents. Our databases, identity systems, and data stores carry decades of technical debt, running on fragile architectures that can't sustain the speed and interdependence of AI-driven operations.

Recent outages at AWS, Azure, and Cloudflare weren't caused by sophisticated attackers—they were cascading failures from minor glitches in complex systems. Now imagine if those had been deliberate, coordinated attacks. **We've been getting away with it. Until now.**

This keynote challenges the conventional AI security narrative:

- **AI vs. AI isn't about deploying black-box defenses** – It's about using AI to finally understand how enterprises actually work
- **The answer isn't more complexity** – It's radical simplification
- **The defender's real edge** – Knowing what "good" looks like, and AI finally enables modeling that across the enterprise

---

## 🚀 Quick Start

### View the Presentation Online

The slides are hosted as a web application:

```
https://bh-eu-slides.mgraph.ai/slides/
```

### Run Locally

```bash
# Clone the repository
git clone https://github.com/the-cyber-boardroom/Presentation__BlackHat-EU__Dec-2025.git
cd Presentation__BlackHat-EU__Dec-2025

# Install dependencies
pip install -r requirements-test.txt

# Run locally
./scripts/run-locally.sh
```

Then open `http://localhost:8000/slides/` in your browser.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `→` / `↓` / `Space` / `PageDown` | Next slide |
| `←` / `↑` / `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |

---

## 📁 Repository Structure

```
.
├── presentation_blackhat_eu_dec_2025/          # Python backend service
│   ├── fast_api/                               # FastAPI application
│   │   ├── Base__Service__Fast_API.py          # Main service configuration
│   │   └── lambda_handler.py                   # AWS Lambda handler
│   ├── service/                                # Service components
│   └── utils/                                  # Utilities & deployment
│
├── presentation_blackhat_eu_dec_2025__slides/  # Web-based slide system
│   └── v0/v0.1/                                # Version 0.1.x releases
│       ├── v0.1.0/                             # Base components
│       │   ├── components/                     # Web components (slide-deck, slide-page)
│       │   ├── css/                            # Styling (common, theme-blackhat)
│       │   ├── assets/                         # Images and logos
│       │   └── decks/                          # JSON slide definitions
│       ├── v0.1.1/                             # Full presentation content
│       ├── v0.1.2/                             # 16:9 print layout fix
│       ├── v0.1.3/                             # Grid layout improvements
│       ├── v0.1.4/                             # Content density detection
│       ├── v0.1.5/                             # Title alignment fix
│       ├── v0.1.6/                             # Incident cards layout
│       ├── v0.1.7/                             # Full deck content
│       ├── v0.1.8/                             # Versus comparison layout
│       └── v0.1.9/                             # Topic cards layout (final)
│
├── docs/                                       # Documentation
│   └── dev/                                    # Developer documentation
│
├── tests/                                      # Test suites
│   ├── unit/                                   # Unit tests
│   └── deploy_aws/                             # Deployment tests
│
├── scripts/                                    # Utility scripts
│   ├── run-locally.sh                          # Local development
│   └── gh-release-to-main.sh                   # Release automation
│
└── .github/workflows/                          # CI/CD pipelines
```

---

## 📊 Slide System Architecture

The presentation uses a custom web component-based slide system designed for:

- **JSON-driven content** – Slides defined declaratively
- **Custom layouts** – Purpose-built for security presentations
- **Print/PDF ready** – 16:9 aspect ratio preserved
- **Progressive enhancement** – Each version adds surgical overrides

### Custom Layouts

| Layout | Purpose | Version |
|--------|---------|---------|
| `bh-cover` | Conference cover slide | v0.1.0 |
| `bh-title` | Title slides with subtitle | v0.1.0 |
| `bh-section` | Section dividers | v0.1.0 |
| `bh-content` | Bullet-point content | v0.1.0 |
| `bh-comparison` | Two-column comparison | v0.1.0 |
| `bh-speaker` | Speaker introduction | v0.1.0 |
| `bh-incident-cards` | Case study cards | v0.1.6 |
| `bh-versus` | Asymmetric face-off comparison | v0.1.8 |
| `bh-topic-cards` | Category cards with bullets | v0.1.9 |

### Incremental Fix Design (IFD)

The slide system uses an **Incremental Fix Design** pattern:

```
v0.1.0/  → Complete base (components, styles, layouts)
v0.1.2/  → Surgical override: 16:9 print layout
v0.1.3/  → Surgical override: Grid layout, title positioning
v0.1.4/  → Surgical override: Content density detection
v0.1.5/  → Surgical override: Title alignment
v0.1.6/  → Addition: bh-incident-cards layout
v0.1.8/  → Addition: bh-versus layout
v0.1.9/  → Addition: bh-topic-cards layout
```

Each version only contains what changed, loading on top of v0.1.0 base.

---

## 📚 Research Documents

The `/docs/` folder contains foundational research documents developed for this presentation:

| Document | Focus |
|----------|-------|
| **Part 1** | Digital Immune System – Session abstract and outline |
| **Part 2** | Autonomous Threats – AI agents as insider threats |
| **Part 3a** | Perfect Storm – Four pillars framework |
| **Part 3b** | Perfect Storm – GenAI meets shaky foundations |
| **Part 4** | Vibe Coding – The new spreadsheets |
| **Part 5** | Defensive Strategies – Knowledge graphs and risk management |
| **Part 6** | GenAI Defense – Practical applications |
| **Part 7** | Capstone Synthesis – Integrated strategy |

See [`docs/bh-slides__research-docs/README.md`](docs/bh-slides__research-docs/README.md) for detailed summaries.

---

## 🎯 Key Concepts

### The Four Pillars of Security Outcomes

1. **Engineering** – Building robust, secure systems
2. **Business Processes** – Embedding security into workflows
3. **Funding & Focus** – Adequate resources for security and quality
4. **Risk Management** – Governance, accountability, and foresight

### Three Categories of Autonomous Threats

1. **Malicious AI Agents** – Purpose-built attack tools
2. **Compromised Benign Agents** – Hijacked enterprise AI (prompt injection)
3. **Unintentionally Harmful Agents** – Misaligned AI pursuing goals destructively

### Digital Immune System Principles

- Know what "good" looks like (baseline modeling)
- Build a digital twin of the enterprise
- Simplify ruthlessly—fewer moving parts = fewer failure points
- Design for graceful degradation, not perfect prevention
- Keep humans in the loop for critical decisions

---

## 🛠️ Development

### Prerequisites

- Python 3.11+
- Poetry (for dependency management)
- Node.js (optional, for slide development)

### Setup

```bash
# Install Python dependencies
poetry install

# Run tests
pytest tests/unit/

# Run locally
./scripts/run-locally.sh
```

### Deployment

The service deploys to AWS Lambda via GitHub Actions:

```bash
# Deploy to dev
git push origin dev

# Deploy to production (via release)
./scripts/gh-release-to-main.sh
```

---

## 📄 Downloads

### Release v2.0.0 (As Delivered)

- **[View Release](https://github.com/the-cyber-boardroom/Presentation__BlackHat-EU__Dec-2025/releases/tag/v2.0.0)**
- PDF slides
- PPTX export
- Source code

---

## 🔗 Links

- **Black Hat EU 2025:** [Event Page](https://blackhat.com/eu-25/)
- **AI Security Summit:** [Schedule](https://blackhat.com/eu-25/summit-sessions/schedule/)
- **The Cyber Boardroom:** [Website](https://thecyberboardroom.com)
- **Akeia.ai:** [Website](https://akeia.ai)

---

## 📝 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Dinis Cruz**  
GenAI Entrepreneur & Former CISO  
[LinkedIn](https://linkedin.com/in/diniscruz)

---

*"In a world where prompt injection remains unsolved and autonomous swarms are coming, security models must assume compromise and contain blast radius. The opportunity is to use GenAI to understand your enterprise deeply enough that neither attackers nor runaway agents have anywhere to hide."*