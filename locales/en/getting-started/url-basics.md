---
title: "Apprise URL Basics"
description: "Understanding the Apprise URL"
---

## Introduction

Apprise URLs are the blueprints used let the application know where to relay your notification(s) through. They follow a simple convention:

* `service://configuration/?parameters`

## Service

The `service://` you specify determines which Apprise plugin will get loaded.  For example, an Email address uses the service id of `mailto://` (and `mailtos://` for secure emails).

[[Click here|Home#notification-services]] to see a list of supported services supported by Apprise.

## Configuration

Most services require a different set of configuration (depending on what it is).  All configuration can be found right after the `service://` declaration.  You need to read up on the notification you're trying to set up to know what you set here.  This can contain anything from _API Keys_, _passwords_, _hostnames_, etc.

## Parameters

These are completely optional to use; but sometimes they grant you more abilities.
Additional parameters always start after the first question mark (**?**) defined in the Apprise URL.  Here is where you can over-ride some global system settings in addition to treating it as an alternative to _Core Configuration_ options.
