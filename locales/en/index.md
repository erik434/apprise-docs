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

**ap·prise** / _verb_<br/>
To inform or tell (someone). To make one aware of something.

<hr/>

_Apprise_ allows you to send a notification to _almost_ all of the most popular _notification_ services available to us today such as: Telegram, Discord, Slack, Amazon SNS, Gotify, etc.

- One notification library to rule them all.
- A common and intuitive notification syntax.
- Supports the handling of images and attachments (_to the notification services that will accept them_).
- It's incredibly lightweight.
- Amazing response times because all messages sent asynchronously.

Developers who wish to provide a notification service no longer need to research each and every one out there. They no longer need to try to adapt to the new ones that comeout thereafter. They just need to include this one library and then they can immediately gain access to almost all of the notifications services available to us today.

System Administrators and DevOps who wish to send a notification now no longer need to find the right tool for the job. Everything is already wrapped and supported within the `apprise` command line tool (CLI) that ships with this product.

## Key Features

- **Simple API**: Send notifications with just a few lines of code
- **Low Overhead**: Written to use as little dependant libraries as possible. In addition to this, all calls are made asynchronously to maximize the response time.
- **Multiple Services**: Support for 120+ notification services
- **URL-Based Configuration**: Configure services using simple URLs
- **Flexible**: Works in Python, as a CLI tool, or via API
- **Self-hosted**: A 100% self-hosted solution

### Other Notes

- Written in Python
- 99.65% Test Coverage (oof... I'll get it back to 100% eventually again)
- Over 15,000+ stars on GitHub! ⭐
- Over 5M downloads a month on PyPI ([source](https://pypistats.org/packages/apprise))
- Over 94M downloads total on PyPI ([source](https://pepy.tech/projects/Apprise?timeRange=threeMonths&category=version&includeCIDownloads=true&granularity=daily&viewType=line))
- The API version of Apprise has had more than 3.8 million downloads from [Docker Hub](https://hub.docker.com/r/caronc/apprise)
- Supports more then 120+ Services already (always adding more!)

## Simple Setup

1. [Pick one or more services you want to notify and see how to configure it](/services). Each service translates to a URL; for example `discord://credentials?customize=options` and/or `telegram://credentials?customize=options` and so forth.
1. Store your configuration in a configuration file:

   ```yaml
   # ~/.apprise.yaml
   # Inline comments supported
   urls:
      # Define upstream services by their URL and optionally tag them
      - mailto://user:pass@gmail.com/marie@yahoo.ca
        - tag: marie, friends

      - mailto://user:pass@gmail.com/jack@example.com:
        - tag: jack, friends

      - mailto://user:pass@gmail.com/jason@acme-corp.com:
        - tag: jason, boss

      # Specifying the same tag more than once just groups the services
      # together (allowing you to notify multiple end points with just
      # one simple reference)

      - kodi://kodihost-1
        - tag: tv

      - kodi://kodihost-2
        - tag: tv

      # This URL has no tags associated with it; all this means is
      # this becomes a default end point to notify
      - mailto://user:pass@hotmail.com
   ```

1. Send your notification:

   ```bash
   # A simple notification
   apprise -t "my title" -b "my body"

   # Send an attachment
   apprise -t 'not looking good' \
        -b 'the dog ate my homework' \
        --attach=/photos/DSC_0001.jpg

   # Send multiple attachments; they can even be from a website
   # or local security footage you're using:
   apprise -b "someone is outside" \
        --attach=http://camera01.home.arpa?image=jpg \
        --attach=http://camera02.home.arpa?image=jpg
   ```

   Assuming we reference the configuration defined above in `2.`,Here is how we can send a notification to a specific upstream service that was previously tagged:

   ```bash
   # Notify all of our Kodi instances; maybe remind those watching it
   # that it's almost time for bed:
   apprise --tag=tv  -b "Bed time is in 20 min"

   # Send an email to just Marie
   apprise --tag=marie -t "Sick Day" -b "I won't be at work tomorrow, i'm not feeling well"

   # Send an email to those you grouped as friends (Marie and and Jack, but not Jason):
   apprise --tag=friends -t "Drinks on me" -b "Let's get a drink on Friday; i'll buy"
   ```

1. Where Apprise gets incredible powerful is when you self-host your own instance of the [Apprise API](https://github.com/caronc/apprise-api) allowing you to store your configuration _in a centralized location_ for all of your instances of Apprise to work from. This is very useful in a corporate or devops environment.
   - Notify your team of outages
   - Notify your employees of an event

## Next Steps

- Check out our [Quick Start Guide](/getting-started/quick-start/) to begin
- Try the [URL Builder](/tools/url-builder/) tool

## Resources

- [Apprise Core GitHub Repository](https://github.com/caronc/apprise)
- [Apprise API GitHub Repository](https://github.com/caronc/apprise-api)
- [Apprise Docs GitHub Repository](https://github.com/caronc/apprise-docs)
