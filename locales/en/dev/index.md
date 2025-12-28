---
title: "Apprise Core Library"
description: "Developing using the Apprise Library"
---

# Table of Contents

<!--ts-->
* [Development API](#development-api)
  * [The Apprise Object](#the-apprise-object)
    * [`add()`](#add-register-notification-services)
    * [`notify()`](#notify-send-notifications)
    * [`async_notify()`](#async_notify-awaitable-notifications)
    * [`len()`](#len-count-services)
    * [`clear()`](#clear-reset-service-list)
    * [`details()`](#details-inspect-configuration--schemas)
  * [The AppriseAsset Object](#the-appriseasset-object)
  * [The Apprise Notification Object](#the-apprise-notification-object)
* **Features**
  * [Pickle/Serialization Support](#pickleserialization-support)
<!--te-->

## The Apprise Object

### Instantiation

```python
import apprise

apobj = apprise.Apprise()
```

---

### `add()`: Register Notification Services

Add one or more service URLs to your notification pool:

```python
# Single service
ok = apobj.add('mailto://user:pass@example.com')

# Multiple services
ok = apobj.add([
    'growl://192.168.1.50',
    'windows://',
])
```

* **Returns**: `True` if all URLs parsed and added; `False` otherwise.

---

### `notify()`: Send Notification(s)

Send to all—or filter by tag:

```python
# Broad notification
apobj.notify(
    title='Deployment Complete',
    body='Version 2.1.0 has been successfully deployed!',
)

# Filtered by tag
apobj.notify(
    title='Error Alert',
    body='Service X failed to respond',
    tag='critical'
)
```

#### Tagging

Apprise tagging allows you to group and filter notifications. Two main design patterns exist:

1. **Inclusive**  
   Define department- or role-based tags and notify any combination:

   ```python
   import apprise

   apobj = apprise.Apprise()

   # 1. Register each department’s notification endpoint with its tag
   apobj.add('slack://hooks.slack.com/services/FINANCE_WEBHOOK_URL',   tag='finance')
   apobj.add('slack://hooks.slack.com/services/DEVOPS_WEBHOOK_URL',    tag='devops')
   apobj.add('slack://hooks.slack.com/services/DEVELOPERS_WEBHOOK_URL', tag='developers')
   apobj.add('slack://hooks.slack.com/services/MANAGEMENT_WEBHOOK_URL', tag='management')

   # 2. Now fire notifications to whichever groups you need:

   # A budget alert → finance team only
   apobj.notify(
       title='Budget Exceeded',
       body='Q2 marketing spend is now 120% of planned.',
       tag='finance'
   )

   # A CI/CD pipeline failure → devops AND developers
   apobj.notify(
       title='Pipeline Failed',
       body='Build #492 on main branch failed unit tests.',
       tag=['devops', 'developers']
   )

   # A high-level executive summary → management only
   apobj.notify(
       title='Monthly Operations Summary',
       body='All systems green; revenue +8% month-over-month.',
       tag='management'
   )

   # A system-wide alert → broadcast to all teams
   apobj.notify(
       title='Service Outage',
       body='API gateway is down; investigating root cause.',
       tag=['finance', 'devops', 'developers', 'management']
   )
   ```

2. **Exclusive**  
   Use specialized tags (e.g. `'warning-download'`, `'warning-upload'`). Apprise ignores unmatched tags silently.

   ```python
   # Add services expecting specific warnings
   apobj.add('json://localhost/download/',     tag='warning-download')
   apobj.add('json://localhost/upload/',       tag='warning-upload')

   # Only 'warning-upload' triggers
   apobj.notify(
       title='Upload Issue',
       body='Upload failed',
       tag='warning-upload'
   )

   # 'warning-parse' is ignored if no service has that tag
   apobj.notify(
       title='Parse Problem',
       body='Parse failed',
       tag='warning-parse'
   )
   ```

General filter expressions follow:

| Filter                        | Selected services                             |
|-------------------------------|-----------------------------------------------|
| `'TagA'`                      | Has **TagA**                                  |
| `['TagA', 'TagB']`            | **OR** between tags                           |
| `[('TagA','TagC'), 'TagB']`   | (**AND** within tuple) **OR** others          |
| `[('TagB','TagC')]`           | **AND** between tags                          |

---

#### Message Types and Themes

By default, all notifications use `NotifyType.INFO` with the `default` theme. Available types:

| Notification Type         | Text Representation | Image |
|---------------------------|---------------------|-------|
| `NotifyType.INFO`         | `info`              | ![info](https://raw.githubusercontent.com/caronc/apprise/master/apprise/assets/themes/default/apprise-info-72x72.png) |
| `NotifyType.SUCCESS`      | `success`           | ![success](https://raw.githubusercontent.com/caronc/apprise/master/apprise/assets/themes/default/apprise-success-72x72.png) |
| `NotifyType.WARNING`      | `warning`           | ![warning](https://raw.githubusercontent.com/caronc/apprise/master/apprise/assets/themes/default/apprise-warning-72x72.png) |
| `NotifyType.FAILURE`      | `failure`           | ![failure](https://raw.githubusercontent.com/caronc/apprise/master/apprise/assets/themes/default/apprise-failure-72x72.png) |

Use a different type:

```python
from apprise import NotifyType

apobj.notify(
    title='Disk Space Low',
    body='Only 5% left',
    notify_type=NotifyType.WARNING,
)
```

---

### `async_notify()`: Awaitable Notifications

Use inside your existing asyncio loop:

```python
import asyncio

async def main():
    results = await apobj.async_notify(
        title='Async Test',
        body='This was sent asynchronously',
    )
    print(results)

asyncio.run(main())
```

---

### `len()`: Count Services

```python
print(f"There are {len(apobj)} services loaded")
```

---

### `clear()`: Reset Service List

```python
apobj.clear()
```

---

### `details()`: Inspect Configuration & Schemas

```python
info = apobj.details()
```

Returns a `dict` containing:

* **version** — Apprise version  
* **asset** — current `AppriseAsset` settings  
* **schemas** — supported services and URLs  
* **details** — templates, tokens, args, kwargs  

<details>
<summary>Example JSON</summary>

```json
{
  "version": "1.0.0",
  "asset": { /* ... */ },
  "schemas": [ /* ... */ ],
  "details": { /* ... */ }
}
```

</details>

---

## The AppriseAsset Object

`AppriseAsset` is the central configuration object that controls the look, feel, and behaviour of your notifications. Even when you simply instantiate `Apprise()`, it creates a default `AppriseAsset()` under the hood (using the “default” theme in `apprise/assets/themes/default`). By customizing `AppriseAsset`, you can:

* Override the application identifier, description, and URL  
* Point to your own local or hosted images (logos and type-specific icons)  
* Enable or disable asynchronous delivery, logging filters, and escape-sequence interpretation  
* Configure persistent storage (caching) for repeated notifications  
* Add your own plugin directories or files  

---

### Constructor Signature

```python
from typing import Union, List, Optional
import apprise

asset = apprise.AppriseAsset(
    # Theme & app identity
    theme: str = "default",
    app_id: str = "Apprise",
    app_desc: str = "Apprise Notifications",
    app_url: str = "https://github.com/caronc/apprise",

    # Image settings
    default_extension: str = ".png",
    image_path_mask: str = "/…/apprise/assets/themes/{THEME}/apprise-{TYPE}-{XY}{EXTENSION}",
    image_url_mask: str = (
        "https://raw.githubusercontent.com/caronc/apprise/master"
        "/apprise/assets/themes/{THEME}/apprise-{TYPE}-{XY}{EXTENSION}"
    ),
    image_url_logo: Optional[str] = None,

    # Plugin discovery
    plugin_paths: Union[str, List[str]] = None,

    # Delivery behaviour
    async_mode: bool = True,
    interpret_escapes: bool = False,
    encoding: str = "utf-8",
    secure_logging: bool = True,

    # Persistent storage (caching)
    storage_mode: Optional[str] = None,    # "auto" | "flush"
    storage_path: Optional[str] = None,
)
```

---

### Key Attributes

| Name                  | Type                   | Default                                                                                                                    | Description                                                                                          |
|-----------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| **theme**             | `str`                  | `"default"`                                                                                                                | Which theme directory to use (maps into `{THEME}`).                                                 |
| **app_id**            | `str`                  | `"Apprise"`                                                                                                                | A short identifier/name for your application.                                                       |
| **app_desc**          | `str`                  | `"Apprise Notifications"`                                                                                                  | A brief description of your notification system.                                                     |
| **app_url**           | `str`                  | `"https://github.com/caronc/apprise"`                                                                                     | A URL where users can learn more about your app.                                                    |
| **default_extension** | `str`                  | `".png"`                                                                                                                   | Default image file extension (e.g. `".png"`, `".jpeg"`).                                             |
| **image_path_mask**   | `str`                  | Local path mask using `{THEME}`, `{TYPE}`, `{XY}`, `{EXTENSION}`.                                                          | Where on disk to find your images/icons.                                                            |
| **image_url_mask**    | `str`                  | Remote URL mask using `{THEME}`, `{TYPE}`, `{XY}`, `{EXTENSION}`.                                                          | Where to fetch hosted images/icons.                                                                 |
| **image_url_logo**    | `Optional[str]`        | `None`                                                                                                                     | A single logo URL for your app (uses `{THEME}` if provided).                                        |
| **html_notify_map**   | `Dict[NotifyType,str]` | Maps each `NotifyType` (INFO/SUCCESS/WARNING/FAILURE) → a hex colour code.| Used by some services that support colourised HTML. An example of this can be found below |
| **async_mode**        | `bool`                 | `True`                                                                                                                     | Send notifications concurrently (if the service/client supports it).                                 |
| **interpret_escapes** | `bool`                 | `False`                                                                                                                    | Convert `\r` and `\n` etc., in your title/body before sending.                                        |
| **encoding**          | `str`                  | `"utf-8"`                                                                                                                  | Character encoding for your content.                                                                |
| **secure_logging**    | `bool`                 | `True`                                                                                                                     | Filter out secrets (passwords, tokens) from debug logs.                                             |
| **plugin_paths**      | `List[str]`            | `[]`                                                                                                                       | One-level scan of directories or explicit `.py` files for custom notification plugins.              |
| **storage_mode**      | `Optional[str]`        | `None`                                                                                                                     | Enable persistent storage: `"auto"` (on-demand) or `"flush"` (per notification).                     |
| **storage_path**      | `Optional[str]`        | `None`                                                                                                                     | Custom file path to use for persistent storage (overrides default).                                 |

Here is an example of what the `html_notify_map` may look like (below is the default settings):

```python
html_notify_map = {
    NotifyType.INFO:    '#3AA3E3',
    NotifyType.SUCCESS: '#3AA337',
    NotifyType.FAILURE:  '#A32037',
    NotifyType.WARNING: '#CACF29',
}
```

---

### Templating Placeholders

When resolving `image_path_mask` or `image_url_mask`, the following tokens are replaced:

| Placeholder    | Runtime Value             | Example                   | Description                                                                                     |
|----------------|---------------------------|---------------------------|-------------------------------------------------------------------------------------------------|
| **`{THEME}`**  | `asset.theme`             | `"default"`               | The theme folder name to reference.                                                            |
| **`{TYPE}`**   | lower-cased `NotifyType`  | `"warning"`               | Type of notification (`info`, `success`, `warning`, `failure`, etc.).                          |
| **`{XY}`**     | resolution string         | `"72x72"`                 | Pixel dimensions of the icon. Apprise ships `32x32`, `72x72`, `128x128`, `256x256` by default.  |
| **`{EXTENSION}`** | `asset.default_extension` | `".png"`               | File extension for your images.                                                                 |

---

### Usage Example

```python
import apprise
from apprise import AppriseAsset

# 1. Define your custom asset:
asset = AppriseAsset(
    app_id="MyApp",
    app_desc="MyApp Alerts",
    app_url="https://example.com",
    theme="custom-theme",
    default_extension=".jpeg",
    image_path_mask="/opt/images/{THEME}/{TYPE}-{XY}{EXTENSION}",
    image_url_mask=(
        "https://cdn.example.com/assets/{THEME}/{TYPE}-{XY}{EXTENSION}"
    ),
    plugin_paths=[
        "/opt/myapp/plugins",       # Scan this directory for .py plugins
        "/opt/myapp/custom.py",     # Load this single plugin file
    ],
    async_mode=False,               # Send one notification at a time
    storage_mode="flush",           # Persist every notification to disk
    storage_path="/var/cache/myapp.db",
)

# 2. Create Apprise with your asset:
apobj = apprise.Apprise(asset=asset)

# 3. Add your services and send a notification:
apobj.add("mailto://user:pass@example.com")
apobj.add("discord://webhook_id/webhook_token")
apobj.notify(
    title="Deployment Complete",
    body="Version 2.1.0 has been successfully deployed!",
)
```

> **Tip:** You can also override any attribute on the fly:
>
> ```python
> asset.theme = "night-mode"
> asset.secure_logging = False
> ```

## The Apprise Notification Object

The **[[The Apprise Object|Development_API#the-apprise-object]]** actually already does a really good managing these for you.  But if you want to manage the notifications yourself here is how you can do it:

```python
# Import this library
import apprise

# Instantiate an object. This is what the apprise object
# would have otherwise done under the hood:
 obj = apprise.Apprise.instantiate('glib://')

# Now you can use the notify() function to pass notifications.
# notify() is similar to Apprise.notify() except the overhead of
# of tagging is not present.  There also no handling of the
# the text input type (HTML, MARKUP, etc).  This is on you
# to manipulate before passing in the content.
obj.notify(
    body=u"A test message",
    title=u"a title",
)

# send() is a very low level call which directly posts the
# body and title you specify to the remote notification server
# There is NO data manipulation here, no overflow handling
# nothing.  But this allows you to free form your own
# messages and pass them along using the apprise handling
obj.send(
    body=u"A test message",
    title=u"a title",
)
```

# Features

## Pickle/Serialization Support

You can Serialize your loaded notifications so they can be restored later on:

```python
import apprise
import pickle

# Instantiate our object
apobj = apprise.Apprise()

# Add our URLs
apobj.add("json://localhost")
apobj.add("xml://localhost")
apobj.add("form://localhost")
apobj.add("mailto://user:pass@localhost")

# Now serialize our object for any purpose
serialized = pickle.dumps(apobj)

# Consider even storing it to disk if you wanted:
with open("myfile.txt", "w") as file:
    file.write(serialized)
```

With respect to the above example, we could later (or in another application) reload our object back as it was without having to re-add all the URLs again:

```python
# Restore our Apprise Object
apobj = pickle.loads(serialized)

# Perhaps we previously wrote it to disk, well we can load our data this way as well:
with open("myfile.txt", "r+") as file:
   apobj = pickle.loads(file.read())
```
