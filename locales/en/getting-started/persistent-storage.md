---
title: "Persistent Storage"
description: "Allows Apprise to avoid requesting the same data over and over again."
---

## Introduction

Persistent Storage greatly reduces the API transactions between you and the service(s) you may use.

For things like:

- The Matrix plugin: persistent cache allows login information to be cached locally for re-use (saving extra API calls to authenticate again each time).
- The Telegram plugin: persistent cache allows Apprise to remember your user account saving extra fetches to the service to determine it each and every time.

Aditional Notes:

- Apprise stores all of it's persistent data in it's own directory unique to the Apprise URL you create. By default all directories are 8 characters in length and a combination of letters an numbers.
- All Apprise persistent files have a `.psdata` extension and are written to a cache directory chosen by you otherwise it defaults to the locations provided by your operating system.

## CLI Utilization

If using the CLI, this data file location used is:

- Microsoft Windows: `%APPDATA%/Apprise/cache`
- Linux: `~/.local/share/apprise/cache`

All Apprise URLs you define have a URL ID generated against them (`uid`).  To see what URL ID's have been assigned to your URLs, simply just use the `--dry-run` and pair it with `--tag=all` to see everything:

```bash
# Given the command:
apprise --dry-run --tag=all
```

The output may look like this:<br/>
![Screenshot from 2024-08-22 21-06-24](https://github.com/user-attachments/assets/4df2f5c5-2b89-41d7-95c9-33c059e514a1)

Once you know the UID, you know the directory your persistent data can be found in. The takeaway from the screenshot above is:

1. Some plugins simply do not utilize persistent storage at all (denoted with `- n/a -`).
1. Reuse of Apprise URLs with the same login credentials share the same UID.  It's the same upsream endpoint after all.

You can list the persistent storage by accessing the `storage` submention of the apprise cli:

```bash
# Given the command:
apprise storage
```

The output may look like this:<br/>
![Screenshot from 2024-08-22 21-27-39](https://github.com/user-attachments/assets/2383d487-b873-4290-960e-c2e360565771)

The takeaway from the screenshot above is this is another way of looking at the storage and how it's been assigned to the URLs.

- You can see the grouping of multiple URLs sharing the same storage endpoint is also listed here.
- It will identify the current amount of disk storage you have in use for the given plugin as well
- Any plugin that does not even utilize peristent storage at all, will not show up in this list.  In the screenshot before this one you will see `dbus://` where it is not identified `storage` results.

The possible disk states are:

- `unused`: The plugin is not occupying any persistent storage on disk
- `stale`: At one pint a plugin exists that wrote to a location that is no longer being referenced.
  - You can clear these entries by simply typing:

     ```bash
     apprise storage clean <STALE UID>
     ```

- `active`: The plugin contains data written into it's cached location.

The CLI tool has Persistent Storage enabled by default using the operational mode of `auto`.

- You can optionally specify `--storage-mode` allowing you to change ths; possibilities are `auto` (default), `flush`, and `memory`.
  - `auto`: This is the default option and pesistent storage is used when applicable (only the plugins that require it take advantage of local cache made available to them).
  - `flush`: Similar to `auto` except that any changes made are immediately flushed to disk.  This mode creates a higher i/o but enforces the content on disk is the latest.
  - `memory`: Effectively turns off Persistent storage.  No plugins are allowed to write to disk.  This is exactly the way Apprise was prior ro the Persistent Storage feature.

### Storage Cleanup

- To remove all accumulated persistent storage generated through the CLI tool, you can run the following:

    ```bash
    apprise storage clean
    ```

- You can compliment this call by providing URL IDs  and/or `--tag` (or `-g`) values to focus on only cleaning specific persistently cached data. For example:

    ```bash
    # Assuming we want to target the URL ID of abc123xy
    apprise storage clean abc123xy
    ```

   You can also clear cache based on tag references:

    ```bash
    # Assuming we want to target the URL(s) associated with the tag 'family'
    apprise storage clean --tag family
    ```
