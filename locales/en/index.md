---
title: Welcome to Apprise
description: Documentation for Apprise - Push Notifications that work with just about every platform!
---

# Introduction

Apprise is a powerful push notification library that allows you to send notifications to 130+ services using a simple, unified interface.

## What is Apprise?

Apprise allows you to send notifications to services like:

- **Slack**
- **Discord**
- **Telegram**
- **Email** (SMTP)
- **Microsoft Teams**
- **Pushover**
- **Gotify**
- And many more!

## Quick Example

```python
import apprise

# Create an Apprise instance
apobj = apprise.Apprise()

# Add notification services
apobj.add('discord://webhook_id/webhook_token')
apobj.add('mailto://user:pass@gmail.com')

# Send a notification to all services
apobj.notify(
    body='This is a test notification!',
    title='Hello World',
)
```

## Key Features

- **Simple API**: Send notifications with just a few lines of code
- **Multiple Services**: Support for 80+ notification services
- **URL-Based Configuration**: Configure services using simple URLs
- **Flexible**: Works in Python, as a CLI tool, or via API

## Next Steps

- Check out our [Quick Start Guide](/getting-started/quick-start/) to begin
- Read the [Introduction](/getting-started/introduction/) for more details
- Try the [URL Builder](/tools/url-builder/) tool

## Resources

- [Apprise GitHub Repository](https://github.com/caronc/apprise)
- [Apprise API GitHub Repository](https://github.com/caronc/apprise-api)
- [Apprise Docs GitHub Repository](https://github.com/caronc/apprise-docs)
