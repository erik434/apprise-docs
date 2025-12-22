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

This repository exists so the community can contribute documentation without
needing to understand how the Apprise website is built or deployed.

If you can write Markdown, you can contribute here.

Content from this repository is automatically synced into the official Apprise
documentation website.

---

## Repository structure

Documentation is organised by language and topic.
```
locales/
  en/
    services/
    guides/
    assets/
```

### Directory overview

1. services/
  Documentation specific to a notification service. This includes URL syntax,
  targets, configuration options, and examples.
1. guides/
  How-to articles, tutorials, troubleshooting notes, and usage patterns that
  may span multiple services.
1. assets/
  Shared images or reusable documentation assets.

---

## Writing documentation

### Markdown
```markdown
- Use standard GitHub-flavoured Markdown
- Keep formatting simple and readable
- Avoid HTML unless absolutely necessary

### Front matter

Each page must include a title.

---
title: "Example Page"
---

Optional fields such as descriptions are welcome but not required.

---
```

## Images

Images should be stored next to the page that uses them.

Example:

```
email/
  index.md
  images/
    auth-flow.png
```

Reference images using relative paths:

```markdown
![Authentication flow](./images/auth-flow.png)
```
---

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
---

## License

Documentation in this repository is licensed under Creative Commons Attribution
4.0 (CC BY 4.0), unless stated otherwise.

By contributing, you agree that your content may be redistributed under this
license.

---

## Getting started

- Read CONTRIBUTING.md
- Open a pull request with your changes
- If unsure where something belongs, open an issue and ask

Thank you for helping improve Apprise.
