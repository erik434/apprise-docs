---
title: "pushdeer Notifications"
description: "Send pushdeer notifications."
---

## PushDeer Notifications

* **Source**: <https://www.pushdeer.com/> or <https://github.com/easychen/pushdeer>
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 32768 Characters per message

You need to have the [PushDeer](https://www.pushdeer.com/) application and obtain a PushKey.
Alternatively, you can also set up the service yourself based on the [PushDeer](https://github.com/easychen/pushdeer) open-source project.

## Syntax

Valid syntax is as follows:

* ```pushdeer://{push_key}```
* ```pushdeers://{push_key}```
* ```pushdeer://{hostname}/{push_key}```
* ```pushdeers://{hostname}/{push_key}```
* ```pushdeer://{hostname}:{port}/{push_key}```
* ```pushdeers://{hostname}:{port}/{push_key}```

## Parameter Breakdown

| Variable | Required | Description |
|----------|----------|-------------|
| push_key | Yes| This is the push key you have obtained from PushDeer. |
| hostname | No | Custom Service Host |
| port | No | Custom Service Port |

#### Example

Send a PushDeer notification

```bash
# Assuming our pushdeer.com {push_key} is abcdefghijklmnop-abcdefg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pushdeers://abcdefghijklmnop-abcdefg"

# For self hosting:
# Assuming our {push_key} is abcdefghijklmnop-abcdefg
# Assuming our {hostname} is myserver.example.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushdeers://myserver.example.com/abcdefghijklmnop-abcdefg
```
