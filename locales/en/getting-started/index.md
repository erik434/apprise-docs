---
title: Introduction
description: What is Apprise and how does it work?
sidebar:
  label: What is Apprise?
  order: 1
---

The name **Apprise** (/əˈpraɪz/) is pronounced like “uh-prise”, similar to _surprise_ or _arise_, with emphasis on the second syllable.

**Apprise** is a notification routing library that standardizes how messages are delivered to dozens of different services. It takes the complexity out of sending notifications.

It does not replace chat platforms, email providers, or alerting systems. Instead, it provides a single, consistent way to send notifications to them.

Whether you are a system administrator running scripts, a developer building an application, or a DevOps engineer managing distributed services, Apprise removes the need to learn and maintain dozens of vendor-specific APIs.

## One Syntax to Rule Them All

At the core of Apprise is the **Universal Notification URL**.

Instead of learning a unique payload format for every service, you configure destinations using a single, predictable syntax:

```text
service://credentials/direction/?parameter=value
```

If you later decide to switch from one service to another, your application logic does not change. You simply update the URL configuration.

This makes notifications portable, maintainable, and easy to reason about.

## The Three Pillars of Apprise

Apprise is unique because it isn't just a library; it is a platform that exists in three complementary forms.

### 1. The Python Library

_For Developers_

At its core, Apprise is a lightweight Python library. You embed it directly into your application and send notifications in just a few lines of code.

```python
import apprise

apobj = apprise.Apprise()

# Notification destinations are configured separately
apobj.notify(
    body="Hello World",
    title="My Notification",
)
```

The same code works regardless of which notification services you configure.

### 2. The Command Line Interface (CLI)

_For system administrators and automation_

Apprise ships with a powerful CLI that exposes the same functionality without requiring Python code. This is ideal for cron jobs, backup scripts, monitoring hooks, and CI/CD pipelines.

```bash
# e.g: Send a notification to Discord
apprise -t "Backup Complete" -b "The server is safe" \
  "discord://webhook_id/webhook_token"
```

### 3. The API Server

_For centralized and networked environments_

Apprise is also available as a stateless, containerized API server. This allows you to operate a centralized “notification gateway” for multiple systems.

You can:

- Send notifications directly with each request (stateless)
- Store configurations server-side and reference them by key (stateful)

This is especially useful for microservices, shared infrastructure, and teams that want centralized control.

## Key Features

- **<!-- SERVICES:COUNT --> supported services**, from popular chat platforms to specialized gateways
- **Format-aware delivery**, including Markdown, HTML, and plain text
- **Attachment support**, automatically adapted to each service’s capabilities
- **High performance**, with parallel notification delivery
- **Minimal dependencies**, designed to stay lightweight

## Which Approach Should I Use?

| If you are…                               | Start with…                     |
| ----------------------------------------- | ------------------------------- |
| Building a Python application             | [The Python Library](/library/) |
| Automating scripts or system tasks        | [The CLI Tool](/cli/)           |
| Centralizing notifications across systems | [The API Server](/api/)         |

From here, the [Getting Started](/getting-started/) section will walk you through installation, configuration, and your first notification.
