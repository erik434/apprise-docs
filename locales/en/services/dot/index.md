---
title: "dot Notifications"
description: "Send dot notifications."
---

## Dot. Notifications

* **Source**: https://dot.mindreset.tech
* **Icon Support**: Yes (Text API accepts a 40×40 PNG icon via base64)
* **Message Format**: Plain Text
* **Message Limit**: Not documented

**Note on Device Naming**: The Dot. service API is used to communicate with hardware devices marketed as **Quote/0**. While the physical devices are sold under the "Quote/0" brand name, the API service and mobile application are branded as "Dot." This plugin uses the `dot://` protocol scheme to match the official API branding, ensuring consistency with Dot.'s documentation and developer tools.

The Dot. smart display exposes two REST endpoints—Text API and Image API—for pushing short reminders or graphics. The new plugin mirrors these entry points while keeping the URL grammar intuitive.

### 🛠️ Setup Instructions

1. Open the Dot. mobile app and retrieve both your **API token** (`dot_app_...`) and device **serial number** (12-character hex string).
2. In the app, enable the **Text API** and/or **Image API** content slot for the device.
3. Use the token and device ID with the `dot://` URLs shown below to trigger notifications.

---

### Syntax

- **Text API**  
  `dot://{token}@{device_id}/text/?signature={footer}&icon={base64_icon}`
  
  Title and message can be provided at runtime via `apprise.notify(title="...", body="...")`.

- **Image API**  
  `dot://{token}@{device_id}/image/?image={base64_png}&link={tap_url}&border={0|1}&dither_type={type}&dither_kernel={kernel}`

### Attachment Support

The plugin supports file attachments that are automatically converted to base64 encoding:

- **Text mode**: The first attachment is automatically used as the `icon` parameter (40×40 PNG) if no `icon` is provided via URL or configuration
- **Image mode**: The first attachment is automatically used as the `image` parameter (296×152 PNG) if no `image` is provided via URL or configuration
- If multiple attachments are provided, only the first one is used and a warning is logged
- If `icon` (text mode) or `image` (image mode) is already provided via URL/configuration, attachments are ignored

---

### 🔐 Parameter Breakdown

| Variable     | Required    | Description                                                                                                                         |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| token        | Yes         | Dot. API token (`dot_app_...`)                                                                                                      |
| device_id    | Yes         | Dot. device serial number (12 hex characters)                                                                                       |
| title        | No (text)   | Title shown on device                                                                                                               |
| message      | No (text)   | Body text shown on device                                                                                                           |
| signature    | No (text)   | Footer text shown on device                                                                                                         |
| icon         | No (text)   | Base64 PNG icon (40×40) for the lower-left corner. Can be provided via URL parameter or first attachment (auto-converted to base64) |
| image        | Yes (image) | Base64 PNG image (296×152) rendered full-screen. Can be provided via URL parameter or first attachment (auto-converted to base64)   |
| link         | No          | Tap-to-interact target (http/https or custom scheme)                                                                                |
| border       | No (image)  | 0=white (default), 1=black frame                                                                                                    |
| ditherType   | No (image)  | DIFFUSION, ORDERED, or NONE                                                                                                         |
| ditherKernel | No (image)  | THRESHOLD, ATKINSON, BURKES, FLOYD_STEINBERG, SIERRA2, STUCKI, JARVIS_JUDICE_NINKE, DIFFUSION_ROW, DIFFUSION_COLUMN, DIFFUSION_2D   |

---

### 📦 Examples

**Send a text reminder (via URL parameters):**

```bash
apprise -vv -t "Morning Routine" -b "Remember to water the plants" \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/text/?signature=Apprise
```

**Send a text reminder with icon via attachment:**

```bash
apprise -vv -t "Morning Routine" -b "Remember to water the plants" \
  -a /path/to/icon.png \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/text/?signature=Apprise
```

**Push an image card (via URL parameter):**

```bash
apprise -vv \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/image/?image=$(base64 -w0 poster.png)&link=https://example.com
```

**Push an image card via attachment:**

```bash
apprise -vv -a /path/to/image.png \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/image/?link=https://example.com
```
