---
title: "sms_manager Notifications"
description: "Send sms_manager notifications."
---

## SMS Manager Notifications

- **Source**: <https://smsmanager.cz>
- **Icon Support**: No
- **Message Format**: Text
- **Message Limit**: 160 Characters per message

### Account Setup

Sign up for SMS Manager [from here](https://smsmanager.cz). You can access your API Key from the management section from your account.

### Syntax

Valid syntax is as follows:

- `smsmgr://{apikey}@/{toPhoneNo}`
- `smsmgr://{apikey}@/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

`smsmanager://` can also be used as an alias to `smsmgr://` if you choose.

### Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | The API Key associated with your SMS Manager Account.                                                                                                                                                            |
| to       | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`.                                                  |
| from     | **\*No** | This requires approval from the Administrator and provides a `sender` option in the payload. It can not exceed 11 characters according to the documentation. You may also use `?sender=` to set this same value. |
| batch    | No       | Send multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                                                                                     |
| gateway  | No       | SMS Manager supports the following gateway settings: `high`, `economy`, `low`, and `direct`. By default this is set to `high` if not otherwise specified.                                                        |

#### Example

Send a SMS Manager Message:

```bash
# Assuming our {apikey} is hard-to-guess
# Assuming our {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   smsmgr://hard-to-guess@+134-555-1223
```
