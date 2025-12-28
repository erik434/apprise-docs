---
title: "chanify Notifications"
description: "Send chanify notifications."
---

## Chanify Notifications

* **Source**: <https://chanify.net/>
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 32768 Characters per message

### Syntax

Valid syntax is as follows:

* `chanify://{token}`

### Parameter Breakdown

| Variable        | Required | Description
| --------------- | -------- | -----------
| token         | **Yes**   | The token you generated as part of your Chanify account

#### Example

Send a notification to your Chanify account:

```bash
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "chanify://token"
```
