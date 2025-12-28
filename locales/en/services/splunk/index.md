---
title: "splunk Notifications"
description: "Send splunk notifications."
---

## Splunk/VictorOps On-Call Notifications

* **Source**: <https://www.splunk.com/en_us/products/on-call.html>
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 32768 Characters per message

## Account Setup

1. [Create an account with Splunk On-Call](https://www.splunk.com/en_us/sign-up.html?redirecturl=https://www.splunk.com/en_us/products/on-call.html) (previously VictorOps). Then set up your REST endoint <br/> ![splunk-01](https://github.com/caronc/apprise/assets/850374/031d341f-d661-42ec-980e-a1048ff730d8)
1. Access your API Key from [this link](https://portal.victorops.com/dash/apprise#/advanced/rest).<br/> ![splunk-02](https://github.com/caronc/apprise/assets/850374/03fb915d-6da7-41b0-8e82-1a7d9e98b36b)<br/>It will look something like this:

   ```
   https://alert.victorops.com/integrations/generic/20131114/alert/1234abcd-c11c-1ad1-a1a1-12345678abcd/$routing_key
                                                                   ^                                  ^ ^          ^
                                                                   |------------ apikey --------------| |          |
                                                                                                        | routing  |
                                                                                                       /    key     \
                                                                                                      | placeholder |
                                                                                                      |-------------|
   ```

1. Finally you will need to define a `routing_key` which can be done from **Settings** -> **Route Keys**<br/>![splunk-03](https://github.com/caronc/apprise/assets/850374/952f762a-dbfa-4f24-92c7-7b18fca5cd17)
1. The `entity_id` is used to ensure your message can be triggered and acknowledged.  It's effectively a key.  If you don't provide one then Apprise will generate one for you (the same one every time).

### Syntax

Valid syntax is as follows:

* `splunk://{routing_key}@{apikey}`
* `splunk://{routing_key}@{apikey}/{entity_id}`
* `victorops://{routing_key}@{apikey}`
* `victorops://{routing_key}@{apikey}/{entity_id}`
* `https://alert.victorops.com/integrations/generic/20131114/ alert/{apikey}/{routing_key}`
* `https://alert.victorops.com/integrations/generic/20131114/ alert/{apikey}/{routing_key}/{entity_id}`

### Parameter Breakdown

| Variable        | Required | Description
| --------------- | -------- | -----------
| apikey            | **Yes**   | The REST API key associated with your Splunk account
| routing_key         | **Yes**   | One of the `routing_key` values you associated within your Splunk account
| entity_id         | No | A key you wish to generate your trigger from.  Keys allow you to alert, ackowledge and/or resolve the same notification later on.
| action         | No | The action you wish to perform with your Splunk/VictorOps Apprise notification.  the following options are available to you:<br/>⚪ `map`: Use Apprise (or custom) action mappings based on the Notification Type.  Hence a `warning` from Apprise triggers a `WARNING` on Splunk, while a `failure` triggers a `CRITICAL` Splunk message (triggering an incident). Finally a `success` triggers a `RECOVERY` Spunk message (clearing an incident).    **`map` is the default action if nothing is specified.**<br />⚪ `warning`: Reguardless of the Apprise notification, ALWAYS trigger a Splunk `WARNING` message.<br/>⚪ `critical`: Reguardless of the Apprise notification, ALWAYS trigger a Splunk `CRITICAL` message.<br/>⚪ `acknowledgement`: Reguardless of the Apprise notification, ALWAYS trigger a Splunk `ACKNOWLEDGEMENT` message.<br/>⚪ `info`: Reguardless of the Apprise notification, ALWAYS trigger a Splunk `INFO` message.<br/>⚪ `recovery`: Reguardless of the Apprise notification, ALWAYS trigger a Splunk `RECOVERY` message.

## Custom Splunk/On-Call Event Mapping

You can have Apprise take a unique Splunk/On-Call action depending on the notification that is triggered if you use the (default) `action` of `map` with this integration.

First consider that Splunk supports the following settings:

1. `CRITICAL`: Triggers an incident
1. `WARNING`: May trigger an incident, depending on your settings
1. `ACKNOWLEDGEMENT`: Acks an incident
1. `INFO`: Creates a timeline event but does not trigger an incident
1. `RECOVERY`:  Resolves an incident

By default if the `action` is set to `map`, then Apprise maps itself to the following:

* Apprise `info` 👉 Splunk `INFO`
* Apprise `warning` 👉 Splunk `WARNING`
* Apprise `failure` 👉 Splunk `CRITICAL`
* Apprise `success` 👉 Splunk `RECOVERY`

If you wish to map these differently, you simply need to use the `:` (colon) when over-riding an apprise variable.  Hence, if you wanted to map the (Apprise) `info` to (Splunk) `ACKNOWLEDGEMENT` instead, your URL would have `?:info=acknowledgement`. You can also short-form it like `?i=a` if you wanted to as well (same effect).

You can add as many re-mappings as you want.  Just be certain to add a colon (`:`) infront of the Apprise notificaiton type first.

## Testing

Send a Spunk On-Call alert to fail our database service:

```bash
# Assuming we want to trigger a Splunk CRITICAL message (we send a Apprise Failure)
# Assuming our {apikey} is 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Assuming our {route_key} is database
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221
```

We can recover from the failure above by just doing the following:

```bash
# Assuming we want to trigger a Splunk ACKNOWLEDGEMENT message (we send a Apprise Success)
# Assuming our {apikey} is 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Assuming our {route_key} is database
apprise -vv -t "Test Message Title" -b "Test Message Body" -n success \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221
```

Send a Spunk message while re-mapping our keys around:

```bash
# Assuming we want the (Apprise) `info` to to trigger a Splunk RECOVERY
# Assuming we want the (Apprise) `warning` to always trigger a Splunk CRITICAL
# Assuming our {apikey} is 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Assuming our {route_key} is database
# In this example we'll send a warning message (which will be a CRITICAL)
apprise -vv -t "Test Message Title" -b "Test Message Body" -n warning \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221?:info=rec&:warn=crit
```

Reguardless of what message type we sent, we always set it as RECOVERY:

```bash
# Assuming we always trigger a recovery
# Assuming our {apikey} is 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Assuming our {route_key} is database
# In this example we'll send a failure message (which will be a RECOVERY due to our settings)
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure  \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221?:action=recovery
```
