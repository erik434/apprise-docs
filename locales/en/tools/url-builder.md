---
title: URL Builder
description: Interactive tool to help you build Apprise notification URLs.
---

## Introduction

The URL Builder is an interactive tool that helps you construct properly formatted Apprise URLs for various notification services.
The interactive URL Builder is currently under development. This tool will provide:

- **Service Selection**: Choose from 80+ supported notification services
- **Parameter Configuration**: Fill in required and optional parameters with helpful hints
- **URL Generation**: Get properly formatted Apprise URLs ready to use
- **URL Validation**: Verify your URLs are correctly formatted
- **Example Generation**: See code examples using your configured URLs

## Current Services Supported

Apprise supports a wide range of notification services including:

- Discord
- Slack
- Telegram
- Email (SMTP)
- Microsoft Teams
- Pushover
- Gotify
- And many more...

## Manual URL Construction

While the interactive builder is being developed, you can construct URLs manually following these patterns:

### Discord

```text
discord://webhook_id/webhook_token
```

### Slack

```text
slack://token_a/token_b/token_c
```

### Telegram

```text
tgram://bot_token/chat_id
```

### Email (SMTP)

```text
mailto://user:pass@domain.com
```

For complete URL format documentation, visit the [Apprise Wiki](https://github.com/caronc/apprise/wiki).
