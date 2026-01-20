---
title: "Notification Manager"
description: "Guide and reference for the Apprise Notification Manager (N_MGR), including schema overrides and runtime control."
---

## Introduction

Working with the Notification Manager allows you to:

- Replacing a built-in notification service with a custom implementation.
- Disabling one or more notification services at runtime.
- Discovering which schemas and plugins are currently available.
- Safely handling schema conflicts caused by decorators or import order.

If you are trying to **override a built-in service (for example, Discord)**, the recommended solution is:

```python
from apprise.plugins import N_MGR

N_MGR.add(MyCustomNotify, schemas="discord", force=True)
```

:::tip
Using `force=True` is the safest and most predictable way to replace an existing schema.
It avoids import-order problems and does not unload previously imported modules.
:::

The **Notification Manager** is the central registry responsible for discovering, registering,
and resolving notification plugins within Apprise.

It maps notification URL schemas such as `schema://...` to their corresponding Python
implementation and controls whether those implementations are enabled, disabled, or overridden.

The manager is a singleton and is typically accessed via:

```python
from apprise.plugins import N_MGR
```

## Core Concepts

### Schema Mapping

A **schema** maps to exactly one notify implementation at a time.

- Any URL beginning with `schema://` routes to the notify class registered for that schema.
- Schemas are case-insensitive and normalized internally.
- By default, schema collisions are rejected to prevent accidental overrides.

### Lazy Loading

The manager uses lazy loading:

- Built-in plugins are discovered only when needed.
- Most operations trigger discovery automatically.
- Calling `load_modules()` forces immediate discovery.

:::note
You do not need to call `load_modules()` manually; it is automatically called once on the first `import apprise` or relative references to it.
:::

### Custom Plugin Loading

Custom notification plugins can be introduced in two ways:

1. Python classes discovered via plugin search paths.
1. Decorator-based custom notifications created using the `@notify` decorator.

Decorator-based notifications are wrapped and registered through the same manager APIs as class-based plugins.

## API Reference

### add()

Registers a notification plugin or decorator wrapper for one or more schemas.

Definition:

```python
add(plugin, *, schemas=None, force=False)
```

Behaviour:

- Fails if a schema already exists.
- Supports registering multiple schemas at once.
- Does not modify existing mappings unless explicitly forced.

Example:

```python
N_MGR.add(MyNotifyClass, schemas="schema")
```

:::tip
Use `force=True` when intentionally replacing an existing service.
:::

### remove()

Removes one or more schema mappings from the registry.

Definition:

```python
remove(*schemas, unload=True)
```

Behaviour:

- By default, removes the schema mapping and may unload unused modules.
- Supports removing multiple schemas in a single call.

Example:

```python
N_MGR.remove("schema1", "schema2")
```

### disable()

Disables one or more notification services without removing their schema mappings.

Definition:

```python
disable(*schemas)
```

Behaviour:

- Prevents usage while preserving registration state.
- Supports disabling multiple schemas at once.

Example:

```python
N_MGR.disable("schema1", "schema2")
```

### enable()

Re-enables previously disabled notification services.

Definition:

```python
enable(*schemas)
```

Behaviour:

- Restores availability of disabled schemas.
- Has no effect if a schema was not disabled.

### load_modules()

Forces immediate discovery of built-in notification plugins.

Definition:

```python
load_modules()
```

:::note
This is rarely required because the manager loads plugins lazily.
:::

## Behavioural Notes

### Unmap vs Unload

Removing a schema can mean:

1. **Unmap only**  
   The schema mapping is removed, but imported Python modules remain loaded.

1. **Unmap and unload**  
   The schema mapping is removed and unused modules may be removed from memory.

:::warning
Unloading modules can affect third-party code that imports or subclasses notify classes.
Use unmap-only behaviour when class identity stability matters.
:::

### Force Overrides

Using `force=True` when calling `add()`:

- Removes any existing mapping for the schema.
- Does not unload previously imported modules.
- Registers the new implementation atomically.

This is the recommended way to replace built-in services.

### Import Order and Decorators

Decorator-based notifications may register schemas at import time.
If ordering is uncertain, `force=True` ensures predictable behaviour regardless of when modules are loaded.

## Examples

### Replace a Built-in Service

```python
N_MGR.add(MyCustomNotify, schemas="discord", force=True)
```

### Disable vs Remove

```python
# Disable schema - can be enabled again using N_MGR.enable("schema")
N_MGR.disable("schema")

# Remove completely
N_MGR.remove("schema")
```

### Multiple Schema Operations

```python
N_MGR.disable("schema1", "schema2")
N_MGR.remove("schema3", "schema4", unload=False)
```

## Troubleshooting

### Schema Already Defined

If a schema already exists, registration will fail unless explicitly overridden. Consider:

1. Choosing a unique schema.
1. Use `add(..., force=True)` for intentional overrides.

### Import-Order Issues

If schemas are registered during module import, conflicts may occur before manual intervention.
Using `force=True` avoids these timing issues.
