---
title: "CLI Tips"
description: "Provide some tips to help leverage usage of the CLI"
---

## Introduction

This page contains some tips and helpful information when working with the Apprise Command Line Interface (CLI).

## Scripting Multi-Line Input/Output with CLI

If you're using the `apprise` tool from the command line, you may be trying to script it to send multiple lines. To acomplish this, there are a number of tweaks you can do with `bash`, `sh`, or `ksh` such as:
Those who want to deliver multiple line output can use the CLI as follows:

```bash
# Send ourselves a DBus related multi-line notification using `stdin` and
# the `cat` tool:
cat << _EOF | apprise -vv -t "Multi-line STDIN Redirect Example" dbus://
Line 1 of output
Line 2 of output
Line 3 of output
_EOF

# Another way is to just redirect the contents of file straight back
# into apprise:
cat ~/notes.txt | apprise -vv -t "Multi-line cat STDIN Redirect Example 2" \
   "email://user:pass@hotmail.com"

# You can also use pass content from a multi-line variable you
# declared:
MULTILINE_VAR="
This variable has been defined
with multiple lines in it."

# Now send our variable straight into apprise:
apprise -vv -t "Multi-line Variable Example" -b "$MULTILINE_VAR" \
   "gotify://localhost"

# Note: to preserve the new lines, be sure to wrap your
#       variable in quotes (like example does above).

```
