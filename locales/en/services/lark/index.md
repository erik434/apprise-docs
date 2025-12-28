---
title: "lark Notifications"
description: "Send lark notifications."
---

## Lark (Feishu) Notifications

* **Source**: <https://open.larksuite.com/>
* **Icon Support**: No
* **Message Format**: Plain Text
* **Message Limit**: ~20,000 Characters

Lark (also known as Feishu in China) allows you to create **custom bots** that can send notifications to groups and chats using **incoming webhooks**.

To use Lark with Apprise, you must first create a bot in your Lark workspace and enable webhooks for it.

### Setup Instructions

1. Visit the [Lark Developer Console](https://open.larksuite.com/) and create or access your app.
2. Under **Features**, enable **Bot** and turn on the **Custom Bot** feature.
3. From the app's **Bot settings**, generate a **Webhook URL**.
4. Copy the webhook — it will look like this:

```
https://open.larksuite.com/open-apis/bot/v2/hook/abcdef1234567890abcdef1234567890
```

This webhook contains a single unique token at the end. This is all Apprise needs to deliver messages.

### Apprise Support

While you can use the full webhook URL directly, Apprise also supports a simplified form using the `lark://` schema.

### Syntax

Valid syntax is as follows:

* `https://open.larksuite.com/open-apis/bot/v2/hook/{token}`
* `lark://{token}`

### Parameter Breakdown

| Variable | Required | Description |
|----------|----------|-------------|
| token    | Yes      | The 32-character integration key at the end of your webhook URL. |

### Examples

#### 1. Using the simplified Apprise URL

```bash
# Assuming our token is abcdef1234567890abcdef1234567890

apprise -vv -t "Lark Title" -b "Body of message" \
   lark://abcdef1234567890abcdef1234567890
```

#### 2. Using the full native URL as-is

```bash
apprise -vv -t "Lark Title" -b "Body of message" \
   https://open.larksuite.com/open-apis/bot/v2/hook/abcdef1234567890abcdef1234567890
```

Both formats are supported and functionally equivalent in Apprise.
