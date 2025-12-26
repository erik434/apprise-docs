# Apprise Documentation

This repository contains the **community-maintained documentation** for
[Apprise](https://github.com/caronc/apprise).

The goal of this repository is to provide clear, practical, and approachable
documentation that helps both new and experienced users get the most out of
Apprise.

This repository contains **documentation only**. It does not include any
website code, build tooling, or frontend frameworks.

---

## Purpose

This repository exists to provide a **single, authoritative source** for all
Apprise documentation, including:

- End-user documentation
- Notification service reference material
- Configuration and usage guides
- Troubleshooting and FAQ content
- Developer and contributor documentation
- Localized translations

If you can write Markdown, you can contribute here.

Content from this repository is synced into [the official Apprise
documentation website](https://appriseit.com/).

## What This Repository Is

- 📚 A **Markdown-only** documentation repository
- 🌍 Home to **all locales and translations**
- 🧩 The canonical source for **service documentation**
- 🤝 Open to community contributions
- 🧠 Free of build systems and rendering logic

If it can be written as Markdown and helps users understand Apprise, it belongs
here.

## Repository Layout

All documentation lives under the `locales/` directory. Each locale mirrors the
same structure to ensure consistency and predictable navigation.

```
locales/
  <locale>/
    index.md
    getting-started/
    guides/
    services/
      <service>/
        index.md
    config/
    qa/
    dev/
    contributing/
    assets/
```

### Key Structural Rules

- **Getting Started** - `getting-started/`
  Introductory material for new users
- **Guides** - `guides/`
  Common workflows, patterns, and best practices. This can be How-to articles, tutorials, troubleshooting notes, and usage patterns that
  may span multiple services.
- **Config** - `config/`
  Configuration reference and syntax explanations
- **QA** - `qa/`
  Troubleshooting, diagnostics, and frequently asked questions
- **Dev** - `dev/`
  Developer-focused documentation and internals
- **Contributing** - `contributing/`
  How to help improve Apprise and its ecosystem
- **Services** - `services/`
  Documentation specific to a notification service. This includes URL syntax,
  targets, configuration options, and examples.
   ```
   services/<service>/index.md
   ```
- `assets/`
  Shared images or reusable documentation assets.


**Note**: Only Markdown and static assets are permitted


### Required Front Matter

Every service page must define at least a title:

```md
---
title: "Discord"
description: "Send notifications to Discord channels using webhooks."
---
```

### Optional Metadata

The following is simply [Astro Starlight](https://starlight.astro.build/) configuration:
```md
sidebar:
  # Changes the label on the left panel:
  label: "Shortened Name"
  # Optionally specify to control the placement of your label
  order: 1
  # Optionally provide if you do not want this to show up in the sidebar.  This
  # is useful for situations where you're providing more options in a link from
  # within an item already identified on the sidebar.
  hidden: true
```

Note that the `services/index.md` has templating built in on it's own.  It is dynamically built using all of the directories defined in the the `services/<service>/index.md` entries.  New services should be defined this way.

Feel free to look at the service template.

## Localization and Translations

- Each locale lives under `locales/<locale>/`
- All labels and navigation text come from Markdown
- No hard-coded UI strings exist in the renderer

Contributions in additional languages are welcome. Translating existing content is just as valuable as writing new documentation.

---

## Contribution Philosophy

This repository is intentionally designed to be **low friction**.

Contributors are encouraged to:

- Improve clarity and accuracy
- Expand service documentation
- Add examples and explanations
- Fix typos and formatting issues
- Provide translations

If your contribution is valid Markdown and follows the structure, it is likely
acceptable.

## Project Status

This documentation set is **actively evolving**.

Some sections are still being refined, reorganized, or expanded as Apprise
continues to grow. Contributions are welcome even while cleanup is ongoing.

Perfection is not required to contribute.

## How You Can Help Today

- Add or improve documentation for a service you use
- Clarify confusing sections
- Expand examples
- Fix mistakes or omissions
- Translate content into another language

Also consider:
- Read CONTRIBUTING.md
- Open a pull request with your changes
- If unsure where something belongs, open an issue and ask

Thank you for helping improve Apprise.

Even small improvements are appreciated.

## Languages and translations

English (en) is the default language.

Translations are welcome, even if incomplete.

To add a new language:
1. Create a directory under locales/
2. Copy the page you want to translate
3. Translate what you can

Example:
```
locales/
  fr/
    guides/
      getting-started.md
```

## License

Documentation in this repository is licensed under the
**Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

This license allows others to copy, distribute, modify, and build upon this
content for any purpose, including commercial use, provided appropriate credit
is given.

The full license text is available in the LICENSE file at the root of this
repository and online at:
https://creativecommons.org/licenses/by/4.0/

By contributing to this repository, you agree that your contributions will be
licensed under CC BY 4.0 unless explicitly stated otherwise.
