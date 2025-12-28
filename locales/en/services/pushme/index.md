---
title: "pushme Notifications"
description: "Send pushme notifications."
---

## PushMe Notifications

* **Source**: <https://push.i-i.me/>
* **Icon Support**: No
* **Attachment Support**: No
* **Message Format**: Text
* **Message Limit**: 32768 Characters per message

### Account Setup

You need to have an account with [PushMe](https://push.i-i.me/) and have downloaded the Phone App.

### Syntax

Valid syntax is as follows:

* `pushme://{token}`

### Parameter Breakdown

| Variable    | Required | Description
| ----------- | -------- | -----------
| token  | Yes      | This is the **push_key** associated with your PushMe Account
| status     |  No  | Optionally include a small little ASCII string representing the notification status being sent (inline with it)  by default this is set to `yes`.

#### Example

Send a PushMe notification:

```bash
# Assuming our {token} (or {push_key}) is abc123

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushme://abc123
```
