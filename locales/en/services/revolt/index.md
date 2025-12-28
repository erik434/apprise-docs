---
title: "Revolt Notifications"
description: "Send Revolt notifications."
---

## Revolt Notifications

* **Source**: <https://revolt.chat>
* **Icon Support**: Yes
* **Attachment Support**: No
* **Message Format**: Text
* **Message Limit**: 2000 Characters per message

### Account Setup

Set up your account on [Revolt Chat](https://revolt.chat/) and generate a bot token

### Syntax

The following syntax is valid:

* `revolt://{bot_token}/{channel_id}`
* `revolt://{bot_token}/{channel_id1}/{channel_id2}/{channel_id3}`

### Parameter Breakdown

| Variable    | Required | Description
| ----------- | -------- | -----------
| bot_token   | Yes      | The token that identifies the bot you created through the Revolt Admin Area.
| channel_id  | Yes      | Identify the users you want your bot to deliver your notifications to. You must specify at least 1 *channel_id*.
| url         | No       | Optionally specify an Embed URL with the API
| icon_url    | No       | Optionally specify a URL to and Image to over-ride defaults

#### Example

Send a telegram notification to lead2gold:

```bash
# Assuming our {bot_token} is 123456789:abcdefg_hijklmnop
# Assuming the {channel} belonging to lead2gold is 12315544
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   revolt://123456789:abcdefg_hijklmnop/12315544/
```
