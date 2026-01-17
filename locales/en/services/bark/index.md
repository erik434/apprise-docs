---
title: "Bark Notifications"
description: "Send Bark notifications."
sidebar:
  label: "Bark"

source: https://github.com/Finb/Bark

schemas:
  - bark: insecure
  - barks

sample_urls:
  - barks://{host}/{device_key}
  - barks://{host}:{port}/{device_key}

has_selfhosted: true
---

<!-- SERVICE:DETAILS -->

## Account Setup

Bark is an iOS App which allows you to push custom notifications to your iPhone. Download the server for a self-hosted solution.

## Syntax

Valid syntax is as follows:

- `bark://{host}/{device_key}`
- `bark://{host}:{port}/{device_key}`

The secure versions:

- `barks://{host}/{device_key}`
- `barks://{host}:{port}/{device_key}`

You can also notify more the one device at a time.

- `bark://{host}:{port}/{device_key1}/{device_key2}/{device_keyN}/`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                              |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device_key | Yes      | The device key you wish to notify                                                                                                                        |
| sound      | No       | Optionally set a sound file to be played with notification sent. Supported sounds are identified [here](https://github.com/Finb/Bark/tree/master/Sounds) |
| click      | No       | Provide a hyperlink that should be associated with the notification                                                                                      |
| level      | No       | Specify the message level. Can be either **active**, **timeSensitive**, or **passive**.                                                                  |
| badge      | No       | Provide a numerical value of 0 (zero) or greater to associate a badge with the bark icon on the iOS device.                                              |
| category   | No       | Associate a category with your notification                                                                                                              |
| group      | No       | Associate a group with your notification                                                                                                                 |
| image      | No       | Set to `no` if you do not want the Apprise alert level being placed as the icon associated with the message.                                             |
| call       | No       | Boolean-like input. Accepts `yes/no`, `true/false`, `1/0`, `+/-`. When enabled, payload includes `1`.                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Bark notification to all devices associated with a project:

```bash
# Assume:
#  - our {hostname} is localhost
#  - our {port} is 8080
#  - our {device_key} is j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P
```
