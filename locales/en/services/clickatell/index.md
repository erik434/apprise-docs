---
title: "clickatell Notifications"
description: "Send clickatell notifications."
---

## Clickatell Notifications
* **Source**: https://www.clickatell.com/
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 160 Characters per message

### Syntax
Valid syntax is as follows:
* `clickatell://{source}@{apikey}/{PhoneNo}`
* `clickatell://{source}@{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
* `clickatell://{apikey}/{PhoneNo}`
* `clickatell://{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

### Parameter Breakdown
| Variable        | Required | Description
| --------------- | -------- | -----------
| apikey         | **Yes**   | The API Key you generated as part of your Clickatell account

#### Example
Send a notification to your Clickatell account:
```bash
# Assuming our {apikey} is token
# Assuming our {PhoneNo} is 1-800-555-1234
apprise -vv --body="Test Message" \
   "clickatell://token/1-800-555-1234"
```