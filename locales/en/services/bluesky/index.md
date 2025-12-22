---
title: "bluesky Notifications"
description: "Send bluesky notifications."
---

## BlueSky Notifications
* **Source**: https://bsky.app/
* **Attachment Support**: Yes
* **Icon Support**: No
* **Message Format**: Text
* **Message Limit**: 280 characters

### Account Setup
1. Create a BlueSky account
1. Access Settings -> Privacy and Security
1. Generate an App Password
1. Assemble your Apprise URL like:
   - bluesky://handle@you-token-here

### Syntax
Valid syntax is as follows:
- `bluesky://user@app_pw`
- `bluesky://user.host@app_pw`
    - This is only required if the `host` is not `bsky.social`


#### Example
Send a public message:
```bash
# Assuming our {Handle} is @John
# Assuming our {AppID} is abcd-1234-efghi-6789

# our user is @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "bluesky://John@abcd-1234-efghi-6789"

```