---
title: "Pushplus Notifications"
description: "Send Pushplus notifications."
sidebar:
  label: "Pushplus"

source: https://www.pushplus.plus/

schemas:
  - bulksms

has_sms: true

sample_urls:
  - https://www.pushplus.plus/send?token={token}
  - pushplus://{token}

limits:
  max_chars: 20000
---

<!-- SERVICE:DETAILS -->

## Account Setup

Pushplus is a Chinese notification platform used to send alerts to WeChat or browser endpoints. It uses a token-based webhook system to deliver messages.

Once you create an account and subscribe to a channel, you will be issued a **token** used to send messages.

1. Register or log into your account at [Pushplus](https://www.pushplus.plus/).
2. From your dashboard, copy your **Token** under the "Push" section.
3. Optionally configure the Pushplus app in WeChat for mobile delivery.

Your notification URL will look like this:

```text
https://www.pushplus.plus/send?token=abc123def456ghi789jkl012mno345pq
```

Apprise supports both the full Pushplus native webhook URL and its simplified version.

## Syntax

Valid syntax is as follows:

- `https://www.pushplus.plus/send?token={token}`
- `pushplus://{token}`

## Parameter Breakdown

| Variable | Required | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| token    | Yes      | Your personal Pushplus Token from your account settings |

<!-- GLOBAL:SERVICE:PARAMS -->

## Examples

Using the simplified Apprise URL:

```bash
apprise -vv -t "Title" -b "This is the body" \
    pushplus://abc123def456ghi789jkl012mno345pq
```

Using the token as a query parameter:

```bash
apprise -vv -t "Title" -b "This is the body" \
    pushplus://?token=abc123def456ghi789jkl012mno345pq
```

Using the full native webhook URL:

```bash
apprise -vv -t "Title" -b "This is the body" \
    https://www.pushplus.plus/send?token=abc123def456ghi789jkl012mno345pq
```
