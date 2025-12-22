---
title: "freemobile Notifications"
description: "Send freemobile notifications."
---

## Free-Mobile
* **Source**: https://mobile.free.fr/
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 160 Characters per message

### Account Setup
Sign up with Free Mobile ([link](https://mobile.free.fr/)) and use your credentials (user and pass) to send a notification.

### Syntax
Valid syntax is as follows:
* `freemobile://{user}@{password}`
 
### Parameter Breakdown
| Variable        | Required | Description
| --------------- | -------- | -----------
| user            | Yes      | The user associated with your [Free-Mobile Account](https://mobile.free.fr/)
| password        | Yes      | The password associated with your [Free-Mobile Account](https://mobile.free.fr/)

#### Example
Send a Free-Mobile Notification:
```bash
# Assuming our {user} is abc123
# Assuming our {password} is 98765
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "freemobile://abc123@98765"
```