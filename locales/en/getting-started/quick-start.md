---
title: Quick Start Guide
description: Get up and running with Apprise in minutes.
sidebar:
  order: 1
---

## Installation

### PyPI

The easiest way is to install Apprise from PyPI:

```bash
pip install apprise
```

### Linux Distributions

- RedHat/Rocky/Oracle:

  ```bash
  ## Enable EPEL Repositories:
  sudo dnf install epel-release

  # Now Install Apprise:
  sud dnf install apprise
  ```

### Docker

Or install the Graphical User Interface API version (Apprise API) from [here](https://github.com/caronc/apprise-api) to centralize your configuration and notifications through a manageable webpage.

```bash
# /config is used for a spot to write all of the configuration files
#         generated through the API. The internal persistent store lives
#         under /config/store so a single /config volume is sufficient.
# /plugin is used for a location you can add your own custom apprise plugins.
#         You do not have to mount this if you don't intend to use it.
# /attach is used for file attachments
#
# /tmp         Temporary files, suitable for `tmpfs` in hardened deployments.
#
# The below example sets a the APPRISE_WORKER_COUNT to a small value (over-riding
# a full production environment setting).  This may be all that is needed for
# a light-weight self hosted solution.
#
# setting APPRISE_STATEFUL_MODE to simple allows you to map your defined {key}
# straight to a file found in the `/config` path.  In simple home configurations
# this is sometimes the ideal expectation.
#
# Set your User ID or Group ID if you wish to over-ride the default of 1000
# in the below example, we make sure it runs as the user we created the container as

# pre-create your directories
mkdir -p /path/to/local/{config,plugin,attach}

docker run --name apprise \
   -p 8000:8000 \
   --user "$(id -u):$(id -g)" \
   -v /path/to/local/config:/config \
   -v /path/to/local/plugin:/plugin \
   -v /path/to/local/attach:/attach \
   -e APPRISE_STATEFUL_MODE=simple \
   -e APPRISE_WORKER_COUNT=1 \
   -e APPRISE_ADMIN=y \
   -d caronc/apprise:latest
```

You can visit your new self hosted instance of the Apprise API at: <http://docker-host:8000>

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

They effectively traslate to: `schema://configuration/?options=`

Check out our [URL Builder Tool](/tools/url-builder/) to help construct URLs for different services.

## Next Steps

- Explore the [Guides](/guides/) section for more detailed examples
- Try the [URL Builder](/tools/url-builder/) to create service URLs
- Visit the [Core Apprise repository](https://github.com/caronc/apprise) for complete documentation
