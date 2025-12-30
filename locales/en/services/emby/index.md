---
title: "Emby Notifications"
description: "Send Emby notifications."
sidebar:
  label: "Emby"

source: https://emby.media

has_selfhosted: true

schemas:
  - emby: insecure
  - embys

sample_urls:
  - embys://{hostname}
  - emby://{hostname}:{port}
  - emby://{userid}:{password}@{hostname}
  - embys://{userid}:{password}@{hostname}:{port}
---

<!-- SERVICE:DETAILS -->

## Syntax

Valid syntaxes are as follows:

- `emby://{hostname}`
- `emby://{hostname}:{port}`
- `emby://{userid}:{password}@{hostname}`
- `emby://{userid}:{password}@{hostname}:{port}`
- `embys://{hostname}`
- `embys://{hostname}:{port}`
- `embys://{userid}:{password}@{hostname}`
- `embys://{userid}:{password}@{hostname}:{port}`

Secure connections (via https) should be referenced using **embys://** where as insecure connections (via http) should be referenced via **emby://**.

## Parameter Breakdown

| Variable | Required | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The server Emby is listening on.                                                                                 |
| port     | No       | The port Emby is listening on. By default the port is **8096** for both **emby://** and **embys://** references. |
| userid   | Yes      | The account login to your Emby server.                                                                           |
| password | No       | The password associated with your Emby Server.                                                                   |
| modal    | No       | Defines if the notification should appear as a modal type box. By default this is set to No.                     |

<!-- GLOBAL:SERVICE:PARAMS -->

## Example

Send a Emby notification to our server listening on port 8096:

```bash
# Assuming our {hostname} is emby.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "emby://emby.server.local"
```
