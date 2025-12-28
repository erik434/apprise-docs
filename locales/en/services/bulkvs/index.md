---
title: "bulkvs Notifications"
description: "Send bulkvs notifications."
---

## BulkVS Notifications

* **Source**: <https://www.bulkvs.com/>
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 160 Characters per message

### Account Setup

Sign up for BulkVS [from here](https://www.bulkvs.com/). You will be provided to create a user and password to associate with your account.  This is all you need to use this through Apprise.

### Syntax

Valid syntax is as follows:

* `bulkvs://{user}:{password}@{fromPhoneNo}`
* `bulkvs://{user}:{password}@{fromPhoneNo}/{target}`

### Parameter Breakdown

| Variable        | Required | Description
| --------------- | -------- | -----------
| user    | Yes      | The username associated with your BulkVS Account.
| password    | Yes      | The password associated with your BulkVS Account.
| to         | **\*No**   | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`.
| from         | **\*No**   | Specify the phone number you registered with BulkVS you wish the message to be identified as being sent from.
| batch     |  No  | Send multiple specified notifications in a single batch (1 upstream post to the end server).  By default this is set to `no`.

#### Example

Send a BulkVS Message:

```bash
# Assuming our {user} is joe
# Assuming our {password} is hard-to-guess
# Assuming the {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bulkvs://joe:hard-to-guess@+134-555-1223
```
