---
title: "Ntfy Notifications"
description: "Send Ntfy (Notify) notifications."
sidebar:
  label: "Ntfy"

source: https://ntfy.sh/

schemas:
  - ntfy: insecure
  - ntfys

has_attachments: true

sample_urls:
  - ntfy://{topic}
  - ntfy://{host}/{topic}
  - ntfy://{user}@{host}:{port}/{topics}
  - ntfy://{user}:{password}@{host}/{topics}
  - ntfy://{token}@{hostname}/{topics}
---

<!-- SERVICE:DETAILS -->

## Account Setup

[Ntfy](https://ntfy.sh/) is a easy to use messaging service.

## Syntax

Ntfy can send notifications through the following **modes**:

- **private**: A locally hosted private server ([github source](https://github.com/binwiederhier/ntfy))
- **cloud**: A setup pointing to <https://ntfy.sh>

Valid syntax is as follows:

- `ntfy://{topic}`
- `ntfy://{host}/{topic}`
- `ntfy://{host}:{port}/{topics}`
- `ntfy://{user}@{host}/{topics}`
- `ntfy://{user}@{host}:{port}/{topics}`
- `ntfy://{user}:{password}@{host}/{topics}`
- `ntfy://{user}:{password}@{host}:{port}/{topics}`
- `ntfy://{token}@{hostname}/{topics}`

The secure versions:

- `ntfys://{topic}`
- `ntfys://{host}/{topic}`
- `ntfys://{host}:{port}/{topics}`
- `ntfys://{user}@{host}/{topics}`
- `ntfys://{user}@{host}:{port}/{topics}`
- `ntfys://{user}:{password}@{host}/{topics}`
- `ntfys://{user}:{password}@{host}:{port}/{topics}`
- `ntfys://{token}@{hostname}/{topics}`

You can specify more then 1 topic such as:

- **ntfy**://**{user}**:**{password}**/**{hostname}**/**{topic1}**/**{topic2}**

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user       | \*No     | The user account to perform the authentication with                                                                                                                                                                                             |
| password   | \*No     | The password to perform the authentication with                                                                                                                                                                                                 |
| hostname   | \*No     | The ntfy server you're sending your notification to.                                                                                                                                                                                            |
| port       | No       | The port the ntfy server is listening on. By default the port is **80** for **ntfy://** and **443** for all **ntfys://** references.                                                                                                            |
| topic      | Yes      | All notifications to a ntfy server MUST have at least one topic defined.                                                                                                                                                                        |
| token      | No       | This is detected, but can otherwise be explicitly specified as a parameter.                                                                                                                                                                     |
| mode       | No       | The authentication mode is automatically detected based what it parses from the URL provided. You only need to set this if you feel it is being detected incorrectly. The possible modes are **private** and **cloud** and are explained above. |
| auth       | No       | Can be set to either `basic` (default) or `token` . `basic` is for User/Password authentication with the Ntfy server while `token` assumes that the provided credentials was a Authorization Token and authenticates in a different fashion.    |
| email      | No       | An email to associate the ntfy post with.                                                                                                                                                                                                       |
| tags       | No       | The ntfy tags to associate with the ntfy post. Use a comma and/or space to specify more then one.                                                                                                                                               |
| attach     | No       | Specify a web URL pointing at a remote attachment you would like the post to reference.                                                                                                                                                         |
| filename   | No       | This is only used if the `attach` was also provided. The ntfy server is smart enough to determine what the `filename` is automatically from this; however if you wish to provide a custom-override to this value, this is where you do it from. |
| click      | No       | Provide a hyperlink that you want users who receive your notification to advance to if they click on it.                                                                                                                                        |
| priority   | No       | Provide a priority such as `max`, `high`, `default`, `low`, or `min`. By default `default` is used if one isn't otherwise provided.                                                                                                             |
| actions    | No       | ntfy action buttons variable                                                                                                                                                                                                                    |
| delay      | No       | Identify a delay for the message reception                                                                                                                                                                                                      |
| image      | No       | This defaults to 'Yes' and hauls in the image associated with the notification                                                                                                                                                                  |
| avatar_url | No       | Optionally over-ride the Apprise Icon notifications and explicitly identify your own                                                                                                                                                            |

## Examples

Send a ntfy notification to our server

```bash
# Assuming our {hostname} is localhost
# Assuming our {topic} is great-place
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ntfy://localhost/great-place
```

We can also send a notification to the ntfy.sh server:

```bash
# Assuming our {topic} is great-place
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ntfy://great-place
```

Ntfy also supports Markdown; if you want to leverage this, simply add `?format=markdown` to your Apprise URL; eg:

```bash
# Assuming our {hostname} is localhost
# Assuming our {topic} is great-place
# Assuming we want to leverage the markdown support
apprise -vv -t "Test Message Title" -b "# Markdown Support" \
   "ntfy://localhost/great-place?format=markdown"
```

If your Ntfy server is behind an HTTPS (Secure) hosted setup, then you simply use `ntfys://`:

<!-- GLOBAL:SERVICE:PARAMS -->

```bash
# Assuming our SECURE {hostname} is localhost
# Assuming our {topic} is great-topic
apprise -vv -t "Test Secure Message Title" -b "Test Message Body" \
   ntfys://localhost/great-topic
```

Sends a ntfy message leveraging the `action=`

```bash
apprise -vv -t "Title" -b "Message content" \
    ntfy://ntfy.selfhostedexample.com/mytopic?actions=view%2CGoogle%2Chttps://www.google.com%3Bview%2CBing%2Chttps://www.bing.com
```
