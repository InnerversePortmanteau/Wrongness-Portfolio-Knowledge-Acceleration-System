# Wrongness Portfolio - User Guide

Welcome to the Wrongness Portfolio! This guide will walk you through the core features and workflows of the application.

## Table of Contents

1.  [The Dashboard](#1-the-dashboard)
2.  [Managing Artifacts](#2-managing-artifacts)
3.  [Managing Datasets](#3-managing-datasets)
4.  [The Protocol Library](#4-the-protocol-library)
5.  [The Mining Workflow](#5-the-mining-workflow)
6.  [Core Actions](#6-core-actions)

---

### 1. The Dashboard

The **Dashboard** is your mission control. It provides a high-level overview of your knowledge portfolio with key metrics:

- **Total Artifacts**: The number of learning cycles you've documented.
- **Active Protocols**: The number of reusable procedures in your library.
- **Time Saved**: A cumulative measure of the impact of applying your protocols.
- **Active Mining**: The number of datasets you are currently analyzing.

The dashboard also displays your **Active Mining Queue** and your **Top Performing Protocols**, giving you an at-a-glance view of your priorities and most effective knowledge.

### 2. Managing Artifacts

The **Artifacts** tab is the heart of your portfolio. An artifact is a documented record of a learning experience.

#### Creating a New Artifact

You can create an artifact in two ways:

- Click the **"New Artifact"** button in the main header.
- Click the floating action button (the "zap" icon) and select **"New Artifact"**.

A modal will appear asking for a **Title**, **Domain**, and **Category**. Fill these out to create the initial artifact.

#### Searching and Filtering

As your library grows, use the tools at the top of the Artifacts tab:

- **Search Bar**: Type any term to perform a case-insensitive search across an artifact's ID, title, domain, and category.
- **Status Filter**: Use the dropdown to view artifacts by their status (`Evergreen`, `Active`, `Archived`).

### 3. Managing Datasets

The **Datasets** tab is where you manage your sources of knowledge for mining. Datasets are automatically prioritized by a score calculated from their relevance, signal density, and transferability.

#### Adding a New Dataset

- **Manual Add**: Click the **"Add Dataset"** button to open a modal. Here you can enter the dataset's details and set its initial priority scores using the sliders.
- **Quick Add**: For common, high-quality sources, use the **"Quick Add: Recommended Datasets"** section. Clicking one of these presets will instantly add it to your library with pre-configured scores.

### 4. The Protocol Library

The **Protocols** tab lists all the reusable procedures you have extracted from your artifacts. Each protocol card displays its key metrics:

- **Times Applied**: How often you've used the protocol.
- **Success Rate**: The percentage of times the protocol led to a successful outcome.
- **Avg Time Saved**: The average time saved per application.
- **Total Impact**: The cumulative time saved by this protocol.

### 5. The Mining Workflow

The **Mining** tab provides a structured environment for extracting knowledge from your datasets. It includes:

- **Mining Workflow Guide**: A step-by-step guide to the knowledge extraction process.
- **Quick Extraction Form**: A form to quickly capture patterns (Wrong Model -> Signal -> Correct Model) as you read through a dataset.
- **Session Timer & Goals**: Tools to help you stay focused and track your progress during a mining session.

### 6. Core Actions

The floating action button (FAB) in the bottom-right corner provides quick access to the most common actions.

#### Logging Protocol Use

1.  Click the FAB and select **"Log Protocol Use"**.
2.  In the modal, select the **Protocol** you applied.
3.  Specify the **Outcome** (Success or Failure).
4.  Enter the estimated **Time Saved** in minutes.

Saving this log will automatically update the protocol's statistics, keeping your data accurate and providing a valuable feedback loop on what works.
