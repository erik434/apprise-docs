---
title: "Custom Notifications"
description: "Write your own plugin easily using the built in Apprise Decorator"
---

## Introduction

This functionality is only available starting at Apprise v1+. The idea is to no longer be limited to just the Notification Services already built into Apprise. Instead you can now very easily write your own and assign it to your own `schema://`

To explain this further, first consider that Apprise is completely built around the Apprise URL's you feed it.

If you feed Apprise a URL such as `tgram://private_credentials` (whether it be via the command line or a configuration file), you're telling it you want to send a [Telegram](notify_telegram) notification. Apprise is able to determine the building blocks it needs to prepare a Telegram notification from the `tgram://` prefix, and then it sends the notification by using the `private_credentials` you provided it.

A Custom notification works the same way by letting Apprise know you want to map your `schema://` to custom code you wrote (instead of the Apprise Notification base it's already aware of).

The advantage of having your own custom hook is that you can now extend Apprise to do just about anything. You're free to write any logic you want within the confines of your custom wrapper. You could:

1. Process the message `body` as an instruction set to run and admin task such as:
   - 🧹 Cleaning a directory of old files
   - 🖥️ performing server maintenance
   - 🔐 Updating your SSL Certificates on your website
   - 🚀 Trigger a puppet call into your fleet of servers
   - 🪙 Trigger code to sell stocks/bitcoins or buy some
1. Trigger your own custom notification service
1. Anything you want can be mapped to it's own `schema://` that you define.

## Declaration: The Notification Decorator

The `@notify` decorator is the key to linking everything together. Below is a very simple example of what your `hook.py` might look like:

```python
# include the decorator
from apprise.decorators import notify

# This example maps foobar:// to your my_wrapper function
@notify(on="foobar")
def my_wrapper(body, title, notify_type, *args, **kwargs):

   # A simple test - print to screen
    print("{}: {} - {}".format(notify_type, title, body))
```

### Wrapper Return Values

Your function can optionally return `True` if it was successful or `False` if it wasn't. This information will get passed back up through the Apprise library. If you choose to not return anything at all (or return `None`) then this is interpreted as being successful.

### Wrapper Parameter Breakdown

When you define your wrapper function that `@notify` will control, you will need to consider the following function parameters you can provide it:

| Variable    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| body        | Yes      | The message body the calling user passed along                                                                                                                                                                                                                                                                                                                                             |
| title       | No       | The message title which is an optional switch for Apprise so it wont' always be populated.                                                                                                                                                                                                                                                                                                 |
| notify_type | No       | The message type will be `info`, `success`, `warning` or `failure`                                                                                                                                                                                                                                                                                                                         |
| meta        | No       | The **combined** (declaration + initialization) URL configuration passed into your my_wrapper. The declaration comes from the `@notify(on=schema)`. The initialization is how the calling user/application initializes your wrapper via their configuratin (a `schema://` call that aligns with your declaration). [See here](#the-meta-variable) for more details on the `meta` variable. |
| attach      | No       | If the call to trigger your wrapper includes one or more attachment, you can find it here as `list()` of `AppriseAttachment()` objects. If there is no attachment specified, then this will be set to None.                                                                                                                                                                                |
| body_format | No       | The message body format as identified by the calling user. For the CLI this defaults to `text`, but for developers, they can optionally set this or not. Possible values would be `None`, `"text"`, `"html"` or `"markdown"`.                                                                                                                                                              |

**ALWAYS** end your wrapper declaration with `*args, **kwargs`. This is VERY important to be forwards compatible with future versions of Apprise while at the same time being able to park entries on the wrapper you're not interested (flagged with `No` in the **Required** section above). Hence your wrapper could be as simple as this if you wanted it to be:

```python
# include the decorator
from apprise.decorators import notify

# This example maps foobar:// to your my_wrapper function
@notify(on="foobar")
def my_wrapper(body, *args, **kwargs):
    #                  ^         ^
    #                  |         |
    #               Always place here!
    print(body)

```

## The `meta` Variable

The `meta` variable passed into your wrapper function is always a dictionary. It contains the fully constructed URL based on your declaration (derived by the `@notify` decorator) in addition to the initialization Apprise URL specified by the user.

The following is an example of what the `meta` variable might look like in your wrapper:

```python
{
  "schema": "foorbar",
  "url": "foorbar://john:doe@hostname:80/test.php?key=value&KEY2=value2",
  "host": "hostname",

  "user": "john",
  "password": "doe",
  "port": 80,
  "path": "/",
  "fullpath": "/test.php",
  "query": "test.php",

  # This is where the Query String Definition is identified (as a dictionary()
  # You'll note that the keys identified on the parameter list are always
  # converted to lowercase, but the values remain as-is.
  "qsd": {"key": "value", "key2": "value2"},

  # An AppriseAsset object grants you access to any customization
  # user of Apprise set up such as icon sets, application name, etc.
  "asset": AppriseAsset(),

  # The tag(s) that was assigned to this notification (by the user)
  # that caused it to trigger.
  "tag": set(),
}
```

Only the variables that are required are provided in this dictionary. Hence if both the declaration and initialization URLs are both `schema://`, then you will only have 4 entries such as:

```python
{
  # This will always map back to your @notify(on="<schema>") declaration
  # For this example we assume the schema was set to 'foobar'
  "schema": "foorbar",

  # This is the URL that was built based on your declaration and whatever was
  # Additionally passed in by the user (initialization) through is config and/or cli call
  "url": "foorbar://",

  # These 2 are ALWAYS present
  "asset": AppriseAsset(),
  "tag": set(),
}
```

## Complex Declarations

You can use the `@notify` declaration to define a more complex URL (instead of just the schema as explained up until now). For example:

```python
# include the decorator
from apprise.decorators import notify

# We can pass a full URL into the declaration instead of just the schema.
@notify(on="foobar://hostname:234?notify_on_complete=0")
def my_wrapper(body, meta, *args, **kwargs):
   # write our logic here


```

The above example does the following:

1. Identify `foobar://` as still the trigger to trigger our wrapper
1. We actually preload our meta dictionary with a breakdown of an already preconstructed URL to be passed into our wrapper function.

The wrapper already contains a `meta` variable that looks like this now:

```json
{
  "schema": "foorbar",
  "url": "foobar://hostname:234?notify_on_complete=0",
  "host": "hostname",
  "port": 234,
  "qsd": { "notify_on_complete": "0" }
}
```

The advantage of this is now when someone attempts to trigger your wrapper script, they can choose to over-ride the defaults (during initialization) you provided (or not). For example:

```bash
# The below actually triggers your wrapper with `meta` set to exactly
# what was identified above. Hence, the template/declaration is used as is.
bin/apprise -vv -b "use defaults" foobar://
```

But one could also do something like:

```bash
bin/apprise -vv -b "over-ride some" \
    "foobar://example.com?notify_on_complete=1&just=checking"
```

The above would apply their initialization values on top of the declaration already set. With respect to this example, the `meta` block would now look like:

```json
{
  "schema": "foorbar",
  "url": "foobar://example.com:234?notify_on_complete=1&just=checking",
  "host": "example.com",
  "port": 234,
  "qsd": { "notify_on_complete": "1", "just": "checking" }
}
```

You can see that fields that were not changed keep the value passed from the declaration (ie.: the port). This allows you to prepare all of your configuration for your wrapper during it's declaration while still allowing the calling user to adjust values if required.

## Plugin Loading

Apprise will only load functions wrapped with `@notify()` decorator. These functions must exist in Python files (denoted with a `.py` extension). The loading process works as follows:

1. If you provide an absolute path to a `.py` file, then it is simply loaded (hidden file or not).
1. If you provide an absolute path to a directory, then one of 2 things can happen:
   1. if an `__init__.py` file is found in this specified directory, then it is loaded and further processing stops.
   1. if no `__init__.py` file is found in the specified directory, then all `.py` files located within this directory are loaded.
      - if a directory is found, then a check is made to see if `directory/__init__.py` exists.
        - If yes: then just that specific file is loaded. There is no further recursive loading/scanning from within this sub-directories.
        - If no: then the directory is skipped.

      All hidden files/directories (prefixed with a period (`.`)) are ignored during any directory scanning.

## Command Line References

By default, the Apprise CLI tool will search the following directories for custom hooks:

- **Linux/Mac**
  - `~/.apprise/plugins`
  - `~/.config/apprise/plugins`

- **Windows**
  - `%APPDATA%/Apprise/plugins`
  - `%LOCALAPPDATA%/Apprise/plugins`

You can over-ride these paths by including a `--plugin-dir` (or `-P`) on the CLI to include your own location. If you provide an override the defaults are not referenced.

```bash
# Assuming we've defined a Python file with our @notify(on="foobar") and placed
# it into one of our default loading paths, we can do the following:
apprise -vv -b "test" foobar://
```

## Developer API References

Developers only need to let their **AppriseAsset()** object know which directories it should scan for modules to load.

```python
from apprise import Apprise
from apprise import AppriseAsset

# Prepare your Asset Object so that you can enable the Custom Plugins to be loaded for your
# instance of Apprise...
asset = AppriseAsset(plugin_paths="/path/to/scan")

# OR....
# You can also generate scan more then one file too:
asset = AppriseAsset(
    plugin_paths=[
        # iterate over all Python files found in the root of the specified path.
        # This is NOT a recursive scan; see how directories work by reading
        # The "Plugin Loading" section above.
        "/dir/containing/many/python/libraries",

        # You can optionally specify an absolute path to a Python file
        "/path/to/plugin.py",

        # if you point to a directory that has an __init__.py file found in it, then only
        # that directory is loaded (it's similar to point to a absolute .py file).
        "/path/to/dir/library"
)

# Now that we've got our asset, we just work with our Apprise object as we normally do
aobj = Apprise(asset=asset)

# If our new custom `foobar://` library was loaded (presuming we prepared one like
# in the examples above).  then you would be able to safely add it into Apprise at this point
aobj.add('foobar://')

# Send our notification out through our foobar://
aobj.notify("test")
```

### Notes and Restrictions

- You can not assign a `schema://` that already exists. You must define something unique.
  - Apprise will just gracefully spit a warning out that it did not load your plugin if this conflict is found.
