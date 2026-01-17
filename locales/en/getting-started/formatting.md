---
title: Formatting & Attachments
description: How to send HTML, Markdown, and File Attachments.
sidebar:
  order: 6
---

Apprise does more than just send plain text. It supports rich text formats and file attachments, automatically adapting the payload to suit the destination service (e.g., converting HTML to Markdown for Discord, or stripping tags for SMS).

## Message Formats

Apprise supports three distinct message formats. You can specify the format when sending a notification to ensure your message renders correctly.

| Format       | Description                                           |
| :----------- | :---------------------------------------------------- |
| **text**     | (Default) Plain text. No formatting is applied.       |
| **markdown** | Common Markdown syntax (bold, italics, lists, links). |
| **html**     | HTML tags (`<b>`, `<i>`, `<a href="...">`).           |

### Specifying Format

**CLI:**
Use the `--input-format` flag (defaults to `text`).

```bash
# Send a Markdown message
apprise -t "Bold Title" -b "**Important** update!" \
    --input-format=markdown \
    "discord://..."
```

**Python:**
Use the `notify_type` or format parameters depending on your implementation.

```python
apobj.notify(
    body="<b>Important</b> update!",
    title="HTML Message",
    # Hints to Apprise that the input is HTML
    body_format=apprise.NotifyFormat.HTML,
)
```

**API:**
Use the `format` parameter in your payload.

```bash
curl -X POST -d 'format=html&body=<b>Bold</b>' http://localhost:8000/notify/...
```

## File Attachments

You can send images, logs, or documents along with your notification. Apprise handles the upload logic for supported services (like Discord, Telegram, and Slack).

### CLI Attachments

Use the `--attach` flag (can be used multiple times).

```bash
# Send a log file
apprise -t "System Alert" -b "See logs attached" \
    --attach /var/log/syslog \
    "mailto://user:pass@gmail.com"

# Send multiple files
apprise -b "Here are the photos" \
    --attach /tmp/photo1.jpg \
    --attach /tmp/photo2.jpg \
    "tgram://..."
```

### Python Attachments

Pass a list of paths to the `attach` argument.

```python
# Single attachment
apobj.notify(
    body="Check this out",
    attach="/path/to/image.png"
)

# Multiple attachments
apobj.notify(
    body="Here are the files",
    attach=[
        "/path/to/file1.pdf",
        "/path/to/file2.zip"
    ]
)
```

### Remote Attachments (URLs)

Apprise can also fetch a file from the web and forward it as an attachment.

```python
# Apprise will download this image and send it to the destination
apobj.notify(
    body="Security Camera Snapshot",
    attach="http://admin:pass@camera/snapshot.jpg"
)
```

:::note
If a service does not support attachments (like SMS), Apprise generally ignores the attachment and sends the text body only, ensuring the notification is still delivered.
:::
