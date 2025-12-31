---
title: "qq Notifications"
description: "Send qq notifications."
---

## QQ Push Notifications

- **Source**: <https://github.com/songquanpeng/message-pusher>
- **Icon Support**: No
- **Message Format**: Plain Text
- **Message Limit**: ~10,000 Characters

QQ Push is a third-party gateway for sending notifications to QQ users via services like [qmsg.zendee.cn](https://qmsg.zendee.cn/).

To use it with Apprise, you'll need to register and obtain a personal **Token**.

### Setup Instructions

1. Visit [qmsg.zendee.cn](https://qmsg.zendee.cn/) and sign in using your QQ account.
2. Once logged in, generate and copy your **token**.
3. You’ll receive a webhook URL like this:

```
https://qmsg.zendee.cn/send/abc123def456ghi789jkl012mno345pq
```

### Apprise Support

You can use the full native webhook or a simplified Apprise URL.

## Syntax

Valid syntax is as follows:

- `https://qmsg.zendee.cn/send/{token}`
- `qq://{token}`
- `qq://?token={token}`

## Parameter Breakdown

| Variable | Required | Description                                     |
| -------- | -------- | ----------------------------------------------- |
| token    | Yes      | Your personal QQ Push token from qmsg.zendee.cn |

## Examples

#### 1. Using the simplified Apprise URL

```bash
apprise -vv -t "QQ Title" -b "Message content" \
    qq://abc123def456ghi789jkl012mno345pq
```

#### 2. Using the query parameter form

```bash
apprise -vv -t "QQ Title" -b "Message content" \
    qq://?token=abc123def456ghi789jkl012mno345pq
```

#### 3. Using the native webhook URL

```bash
apprise -vv -t "QQ Title" -b "Message content" \
    https://qmsg.zendee.cn/send/abc123def456ghi789jkl012mno345pq
```

All formats above are accepted and deliver the same result.
