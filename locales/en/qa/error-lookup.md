---
title: "Error Messages"
description: "Common error messages and handling of them."
---

## Introduction

Frequently identified error messages can be recorded in this section

### RuntimeError: asyncio.run() cannot be called from a running event loop

If your calling program runs it's own event loop, then Apprise can cause some commotion when it tries to work with it's own. For these circumstances you have 2 options:

1. Do not call `notify()`. Instead `await` the `async_notify()` call itself. [See here for more details](/qa/#async_notify--leveraging-await-to-send-notifications).
1. Leverage a library that handles this exact case called [nest-asyncio](https://pypi.org/project/nest-asyncio/):

   ```bash
   pip3 install nest-asyncio
   ```

   Then from within your python application just import it at the top:

   ```python
   import nest_asyncio
   # apply it
   nest_asyncio.apply()
   ```

   An issue related to FastCGI was brought forth [here](https://github.com/caronc/apprise/issues/610) and solved using this method.

## Pyinstaller Handling

[Pyinstaller](https://pyinstaller.org/) allows to package a python application with its dependencies in a single exe.

It is possible to package an application that is using Apprise but there is a trick.

Let's take a simple script:

```python
import apprise
apobj = apprise.Apprise()
apobj.add('<SCHEME>://<FQDN>/<TOKEN>')
apobj.notify(title="a title", body="this is the body of the notification")
```

Then package with `pytinstaller`:

```bash
pyinstaller -F myscript.py
```

And launch it:

```bash
./dist/myscript
```

We get:

```text
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/attachment'
or
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/plugins'
or
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/config'
```

We have to use `--collect-all` option which, according to documentation:

> Collect all submodules, data files, and binaries from the specified package or module. This option can be used multiple times.

```bash
pyinstaller -F --collect-all apprise myscript.py
```

No more errors, notifications are sent.
