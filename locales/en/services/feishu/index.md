---
title: "feishu Notifications"
description: "Send feishu notifications."
---

## Feishu Notifications

* **Source**: <https://open.feishu.cn/>
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 19985 Characters per message

### Account Setup

Register your account with [Feishu](https://open.feishu.cn/) and then [follow these instructions](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot) to create a custom bot (and acquire the token you need).

### Syntax

Valid syntax is as follows:

* `feishu://{token}`

### Parameter Breakdown

| Variable        | Required | Description
| --------------- | -------- | -----------
| token         | **Yes**   | The token you generated as part of your Fieshu Custom Bot Creation (via your account)

#### Example

Send a notification to your Feishu account:

```bash
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "feishu://token"
```
