# Apprise Documentation

This repository contains the **community-maintained documentation** for  
[Apprise](https://github.com/caronc/apprise) and [Apprise-API](https://github.com/caronc/apprise-api)

All content here is validated and synced into the [official site](https://appriseit.com/) automatically.

## How This Content Is Used

Content from this repository is **synced into the official Apprise documentation website**:

👉 <https://appriseit.com/>

In addition to this, a **development hosting of the same site** (live copy of the `master` branch) allowing a staging preview of the next release.

👉 <https://dev.appriseit.com/>

This repository exists so that **anyone who can write Markdown** can help improve Apprise’s
documentation, while providing a **single, authoritative source** for all
Apprise and Apprise-API documentation.

## What This Repository Is

- 📚 A **Markdown-only** documentation source
- 🧩 The canonical home for **service documentation**
- 🌍 The source of **all translations and locales**
- 🤝 Open to **small and large contributions alike**

If it can be written as Markdown and helps users understand [Apprise](https://github.com/caronc/apprise) and its companion [Apprise-API](https://github.com/caronc/apprise-api), then it belongs here.

## Repository Layout

All documentation lives under the `locales/` directory.

Each locale mirrors the same structure so navigation remains predictable across languages.

```text
locales/
  <locale>/
    index.md
    getting-started/
    guides/
    services/
      <service>/
        index.md
    api/
    cli/
    library/
    qa/
    contributing/
    assets/
```

### Directory Guide

- **Getting Started** (`getting-started/`)  
  Introductory material for new users

- **Troubleshooting** (`qa/`)  
  Troubleshooting, diagnostics, and FAQs

- **Apprise API** (`api/`)  
  Documentation for web based API (Sidecar) wrapper for Apprise

- **Apprise CLI** (`cli/`)  
  Command line interface documentation

- **Apprise (Python) Library** (`library/`)  
  Developer-focused documentation and internals

- **Guides** (`guides/`)  
  How-to articles, workflows, best practices, and troubleshooting patterns

- **Contributing** (`contributing/`)  
  How to help improve Apprise and its ecosystem

- **Services** (`services/`)  
  Documentation specific to a notification service, including URL syntax,
  configuration options, and examples

## Getting Started as a Contributor

### Prerequisites

- Node.js (LTS recommended)
- `pnpm` (version pinned in `package.json`)
- Git

### Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Make your documentation changes  
   Add, edit, or improve any Markdown file.

3. Run validation:

   ```bash
   pnpm lint
   ```

   Most formatting issues can be fixed automatically with:

   ```bash
   pnpm lint:fix
   ```

4. Open a pull request 🎉

> If linting fails, it will tell you exactly what needs attention.

## Adding or Improving a Service

Each service lives at:

```text
locales/<locale>/services/<service>/index.md
```

Optionally, a service may include an `images/` directory for logos or diagrams.

```text
services/<service>/
├── index.md
└── images/
    └── logo.svg
```

### Service Logos

Service logos are optional, but encouraged when an official logo is available.

- Supported formats: `.svg`, `.png`, `.jpg`, `.jpeg`
- Raster images should not exceed:
  - **200px height**
  - **440px width**

If present, logos are automatically rendered on the service page.

## Assets

This repository supports two types of assets:

### Global Assets

Global assets live under:

```text
locales/<locale>/assets/
```

These assets are shared across documentation pages within the same locale
and are automatically published to the documentation site during sync.

Examples include:

- Shared diagrams
- Project logos
- Screenshots without language-specific text

In Markdown, global assets should be referenced using absolute paths:

```md
![Apprise Logo](/assets/apprise-logo.png)
```

### Service-Specific Assets

Service-specific assets belong alongside the service documentation:

```text
services/<service>/
├── index.md
└── images/
    └── logo.svg
```

These assets should be referenced using relative paths:

```md
![Service Logo](images/logo.svg)
```

Only include assets that are directly relevant to the service.

## Service Page Template

Each service page starts with a frontmatter block that describes its capabilities.

This metadata is **used to generate the Overview section automatically** on the site.

A minimal example:

````md
---
title: "Example Notifications"
description: "Send notifications using Example"
sidebar:
  label: "Example"

source: https://example.com
group: general

schemas:
  - example://

sample_urls:
  - example://{token}/
  - example://{token}/{target}
---

<!-- SERVICE:DETAILS -->

## Account Setup

How to get set up with Example

## Syntax

Valid syntax is as follows:

- `example://{token}`
- `example://{token}/{target}`

## Parameter Breakdown

| Variable | Required | Description                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------- |
| token    | yes      | Token to access the example server                                                             |
| target   | no       | The target you wish to notify. If no target is specified, we send a notification to ourselves. |

<!-- GLOBAL:SERVICE:PARAMS -->

## Example

Send a Example notification:

```bash
apprise -vv -t "My Title" -b "Message Body" \
   "example://my-token/target"
```
````

> The markers such as `<!-- SERVICE:DETAILS -->` are intentional and must be left in place.  
> They are replaced automatically when the documentation is rendered.

## Localization and Translations

- Each language lives under `locales/<locale>/`
- English (`en`) is the default
- Translations may be partial and incremental

Even partial translations are welcome.

## Linting and Validation

This repository uses automated checks to ensure:

- Consistent Markdown formatting
- Supported frontmatter keys and structure
- Predictable rendering on the website

Linting exists to **help contributors**, not to block them. Most failures are
formatting or unsupported metadata issues and are easy to fix.

## How You Can Help

- Improve documentation for a service you use
- Clarify confusing sections
- Add examples
- Fix typos or formatting issues
- Translate content into another language

If you are unsure where something belongs, open an issue and ask.

## License

All documentation in this repository is licensed under  
**Creative Commons Attribution 4.0 International (CC BY 4.0)**.

By contributing, you agree that your work will be licensed under CC BY 4.0 unless stated otherwise.
