---
title: "Inspection & Debugging"
description: "Introspect supported services and capture logs for debugging."
sidebar:
  order: 6
---

Apprise provides powerful tools to inspect its own capabilities and debug issues within your application.

## Inspecting Capabilities (`details`)

The `details()` method returns a dictionary containing all supported notification services, their requirements, and arguments. This is useful for building dynamic UIs that generate Apprise URLs based on user input.

```python
import apprise
import json

apobj = apprise.Apprise()

# Retrieve details
info = apobj.details()

# Print formatted JSON
print(json.dumps(info, indent=2))
```

### Output Structure

The returned dictionary contains three main keys:

1. **`version`**: The current Apprise library version.
2. **`asset`**: The current [AppriseAsset](/library/assets) configuration.
3. **`schemas`**: A list of every supported service.

#### Schema Details

Each entry in `schemas` contains granular metadata about a service:

- **`service_name`**: Human-readable name (e.g., "Discord").
- **`secure_protocols`**: List of secure schemas (e.g., `['https']`).
- **`details`**:
  - **`templates`**: Example URL patterns (e.g., `{schema}://{user}@{host}`).
  - **`tokens`**: Definitions for URL components (e.g., `apikey`, `webhook_id`).
  - **`args`**: Supported query parameters (e.g., `?format=markdown`).

### Filtering Results

You can filter the output to show disabled services or dependencies.

```python
# Include services that are installed but disabled (e.g., missing system dependencies)
info = apobj.details(show_disabled=True)
```

## Debugging with `LogCapture`

Apprise includes a context manager called `LogCapture` to intercept logging output. This is cleaner than configuring the standard Python `logging` module globally, especially for capturing failure reasons programmatically.

### Capture to Memory

```python
import apprise

apobj = apprise.Apprise()
apobj.add('mailto://user:pass@example.com')

# Capture all logs (INFO and above) to memory
with apprise.LogCapture(level=apprise.logging.INFO) as output:
    apobj.notify(title="Hello", body="World")

    # 'output' is a StringIO object
    print("Logs captured:")
    print(output.getvalue())
```

### Capture to File

You can also direct logs to a temporary or persistent file.

```python
# Write logs to a specific file
with apprise.LogCapture(path='/var/log/apprise.log', delete=False) as output:
    apobj.notify("System Crash!")

    # 'output' is a file object here
```

### HTML Formatting

You can inject custom formatting into the log stream to render logs directly into a web page.

```python
# Define an HTML format
fmt = '<li><span class="time">%(asctime)s</span> <span class="msg">%(message)s</span></li>'

with apprise.LogCapture(fmt=fmt) as logs:
     apobj.notify("Test Message")

     # Get the HTML string
     html_output = f"<ul>{logs.getvalue()}</ul>"
```
