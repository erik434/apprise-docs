---
title: Welcome to Apprise
description: Documentation for Apprise

# Hide our title
head:
  - tag: style
    content: |
      .sl-container > .main-frame h1 { display: none !important; }
      main h1:first-of-type { display: none !important; }
---

<div align="center" style="margin-bottom: 2rem;">
  <img
    src="/assets/apprise-logo.png"
    alt="Apprise Logo"
    width="80%"
    style="max-width: 800px; height: auto;"
  />
</div>

**ap·prise** / *verb*<br/>
To inform or tell (someone). To make one aware of something.
<hr/>

*Apprise* allows you to send a notification to *almost* all of the most popular *notification* services available to us today such as: Telegram, Discord, Slack, Amazon SNS, Gotify, etc.

* One notification library to rule them all.
* A common and intuitive notification syntax.
* Supports the handling of images and attachments (*to the notification services that will accept them*).
* It's incredibly lightweight.
* Amazing response times because all messages sent asynchronously.

Developers who wish to provide a notification service no longer need to research each and every one out there. They no longer need to try to adapt to the new ones that comeout thereafter. They just need to include this one library and then they can immediately gain access to almost all of the notifications services available to us today.

System Administrators and DevOps who wish to send a notification now no longer need to find the right tool for the job. Everything is already wrapped and supported within the `apprise` command line tool (CLI) that ships with this product.

## Installation

The easiest way is to install Apprise from PyPI:

```bash
pip install apprise
```

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

## Key Features

* **Simple API**: Send notifications with just a few lines of code
* **Multiple Services**: Support for 130+ notification services
* **URL-Based Configuration**: Configure services using simple URLs
* **Flexible**: Works in Python, as a CLI tool, or via API

## Next Steps

* Check out our [Quick Start Guide](/getting-started/quick-start/) to begin
* Read the [Introduction](/getting-started/introduction/) for more details
* Try the [URL Builder](/tools/url-builder/) tool

## Resources

* [Apprise GitHub Repository](https://github.com/caronc/apprise)
* [Apprise API GitHub Repository](https://github.com/caronc/apprise-api)
* [Apprise Docs GitHub Repository](https://github.com/caronc/apprise-docs)
