---
title: "spugpush Notifications"
description: "Send spugpush notifications."
---

## SpugPush Notifications

- **Source**: <https://push.spug.dev/>
- **Icon Support**: No
- **Message Format**: Plain Text
- **Message Limit**: ~10,000 Characters

SpugPush is a simple webhook service provided by the Spug monitoring platform. It allows applications to send alert messages using a secure access token.

### Setup Instructions

1. Visit the [SpugPush service](https://push.spug.dev/).
1. Sign in and generate your **token**.
1. Copy the full webhook URL, which will look like:

```text
https://push.spug.dev/send/abc123def456ghi789jkl012mno345pq
```

The token portion at the end is the only value Apprise requires.

### Apprise Support

Apprise supports both the full native webhook and a simplified URL form.

## Syntax

Valid syntax is as follows:

- `https://push.spug.dev/send/{token}`
- `spugpush://{token}`

## Parameter Breakdown

| Variable | Required | Description                                                          |
| -------- | -------- | -------------------------------------------------------------------- |
| token    | Yes      | The 32–64 character SpugPush token used to authenticate the request. |

You may also use the query format: `spugpush://?token=YOUR_TOKEN`.

## Examples

Using the simplified Apprise URL:

```bash
apprise -vv -t "SpugPush Title" -b "Notification content" \
   spugpush://abc123def456ghi789jkl012mno345pq
```

Using the token as a query parameter:

```bash
apprise -vv -t "SpugPush Title" -b "Notification content" \
   spugpush://?token=abc123def456ghi789jkl012mno345pq
```

Using the full native webhook URL:

```bash
apprise -vv -t "SpugPush Title" -b "Notification content" \
   https://push.spug.dev/send/abc123def456ghi789jkl012mno345pq
```

All forms are valid and supported equally by Apprise.
