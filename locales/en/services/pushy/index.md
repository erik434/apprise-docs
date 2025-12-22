---
title: "pushy Notifications"
description: "Send pushy notifications."
---

## Pushy Notifications
* **Source**: https://pushy.me/
* **Icon Support**: No
* **Attachment Support**: No
* **Message Format**: Text
* **Message Limit**: 4096 Characters per message

You need to have an account with [Pushy](https://pushy.me/) and create an App.

### Syntax
Valid syntax is as follows:
* `pushy://{apikey}/{targets}`

### Parameter Breakdown
| Variable    | Required | Description
| ----------- | -------- | -----------
| apikey | Yes      | This is the **Secret API Key** associated with your Pushy App
| targets | Yes      | This must be either a **Topic** or a **Device**.  Topics should be prefixed with a `#` and Devices a `@`.  If no prefix is specified, then it is assumed to be a Topic
| sound | No      | Optionally specify a sound you defined such as `alarm.aiff`.
| badge | No     | Provide a numerical value of 0 (zero) or greater to associate a badge with the bark icon on the iOS device.

#### Example
Send a Pushy notification:
```bash
# Assuming our {apikey} is abcdefghijklmnopqrstuvwxyzabc
# Assuming our {target} is a device with the id abcabcabc
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushy://abcdefghijklmnopqrstuvwxyzabc/@abcabcabc
```