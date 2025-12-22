---
title: "seven Notifications"
description: "Send seven notifications."
---

## Seven Notifications
* **Source**: https://www.seven.io/
* **Icon Support**: No
* **Attachment Support**: No
* **Message Format**: Text
* **Message Limit**: 160 Characters per message

### Account Setup
Signup [from here](https://www.seven.io/). It is from the device you can access it's web interface and configure your access token.

### Syntax
Valid syntax is as follows:
* `seven://{token}/{target}`

### Parameter Breakdown
| Variable        | Required | Description
| --------------- | -------- | -----------
| token    | Yes      | This is your generated Access Token associated with your Seven account.
| target     | Yes   | One or more phone number(s) you wish to send your notification to. 
| flash     | No   | Flash mode (default is `no` ); specify `yes` to enable
| label     | No   | Defines a label

#### Example
Send a Seven notification:
```bash
# Assuming our {AccessToken} is abcd123
# Assuming we want to notify 555221237, and +18005551234
# Test out the changes with the following command:
apprise -t "Test Title" -b "Test Message" \
 seven://abcd123/555221237/+18005551234

```
