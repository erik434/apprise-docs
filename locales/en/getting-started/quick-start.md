---
title: Quick Start Guide
description: Get up and running with Apprise in minutes.
---

## Installation

### Python Package

Install Apprise using pip:

```bash
pip install apprise
```

### Docker

You can also run Apprise using Docker:

```bash
docker pull caronc/apprise
```

## Basic Usage

### Python Example

```python
import apprise

# Create an Apprise instance
apobj = apprise.Apprise()

# Add notification services using URLs
apobj.add('mailto://user:pass@gmail.com')
apobj.add('discord://webhook_id/webhook_token')

# Send a notification
apobj.notify(
    body='This is a test notification!',
    title='Hello World',
)
```

### CLI Example

```bash
# Send a notification via command line
apprise -t "Hello" -b "World" \
    mailto://user:pass@gmail.com \
    discord://webhook_id/webhook_token
```

## Understanding Apprise URLs

Apprise uses URL schemes to configure notification services. Each service has its own URL format:

- **Email**: `mailto://user:pass@domain.com`
- **Discord**: `discord://webhook_id/webhook_token`
- **Slack**: `slack://token_a/token_b/token_c`
- **Telegram**: `tgram://bot_token/chat_id`

Check out our [URL Builder Tool](/tools/url-builder/) to help construct URLs for different services.

## Next Steps

- Explore the [Guides](/guides/) section for more detailed examples
- Try the [URL Builder](/tools/url-builder/) to create service URLs
- Visit the [main Apprise repository](https://github.com/caronc/apprise) for complete documentation
