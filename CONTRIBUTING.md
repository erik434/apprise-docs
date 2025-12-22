# Contributing to Apprise Documentation

Thank you for your interest in contributing to the Apprise documentation.

This repository is intentionally lightweight. If you can write Markdown, you
can make a valuable contribution.

## What you can contribute

You are welcome to contribute:

- New guides and tutorials
- Service-specific documentation
- Corrections and clarifications
- Examples and real-world usage notes
- Translations into other languages

You do not need to be a developer to contribute.

## Where content belongs

Use the following guidelines:

Service documentation:
```
  locales/en/services/<service>/
```

Guides and how-to articles:
```
  locales/en/guides/
```

Images
  Place images in an images/ directory beside the page that uses them

Shared assets:
```
  locales/en/assets/
```

If you are unsure, place your content in guides/ and it can be reorganised later.

## Creating a new page

1. Choose the appropriate directory
2. Create a new Markdown file
3. Add required front matter
   ```markdown
   ---
   title: "My New Guide"
   ---
   ```
4. Write clear, concise documentation
5. Commit your changes and open a pull request

## Editing existing pages

- Keep changes focused
- Avoid large rewrites unless necessary
- Preserve existing structure where possible
- Fix spelling, grammar, and clarity freely

## Images and media

- Place images in an images/ directory beside the page
- Use descriptive filenames
- Reference images using relative paths
- Avoid hot-linking images from external sites

## Translations

Translations are always welcome, even if incomplete.

Guidelines:
- Mirror the source directory structure
- Translate titles and headings
- Leave technical terms unchanged if unsure

Example:

```
locales/fr/guides/getting-started.md
```

## Style guidelines

- Be friendly and practical
- Prefer examples over theory
- Avoid unnecessary jargon
- Assume readers are new to Apprise

There is no strict writing style enforcement. Clarity matters most.

## Review process

- All contributions are reviewed
- Maintainers may suggest edits
- Small fixes are merged quickly
- Larger changes may involve discussion

## Questions

If you are unsure where to start:
- Open an issue
- Ask for guidance
- Suggest improvements

We are happy to help.

Thank you for contributing to Apprise.
