---
title: "Office 365 Notifications"
description: "Send Office 365 notifications."
sidebar:
  label: "Office 365"

schemas:
  - o365

has_attachments: true

sample_urls:
  - o365://{source}/{tenant_id}/{client_id}/{client_secret}/
  - o365://{source}/{tenant_id}/{client_id}/{client_secret}/{targets}
---

<!-- SERVICE:DETAILS -->

## Account Setup

You will need to have a valid Microsoft Personal Account AND you will require Administrative access unfortunately (to access the **Mail.Send** and **Mail.ReadWrite** Application Permission). More details can be [found here](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-oauth-client-creds) about registering your app with Azure.

1. From the [**Azure Portal**](https://portal.azure.com/) go to **App Registrations** ([alt link](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade))
   - Use the search bar at the top of the Azure Portal and type `App Registrations`.
   - If you still can't access anything, it's possible your organisation restricts you from doing so. You may need to reach out to to your administrator in order to proceed.<br/>![Office 365](https://github.com/user-attachments/assets/21d5a2fb-3a8b-4f27-bf62-0771fac60d63)
1. Click **Register an application**
   - _give any name (your choice) in Name field_
   - select _personal Microsoft accounts only_
   - Click **Register**
1. From here (the **Overview** panel) you can acquire both the Directory (`tenant`) ID and the Application (`client_id') you will need.
1. To create your `client_secret` , go to **Active Directory** -> **Certificate & Tokens** -> **New client secret**
   - The `client_secret` is an auto-generated string which may have `@` and/or `?` character(s) in it. You will need to encode these characters to when pasting this into your Apprise URL. See the note section above for more details on how to do this.
1. Now need to set permission **Active directory** -> **API permissions** -> **Add permission**.
1. Click on **Microsoft Graph**
1. Click on **Application Permissions** and search for **Mail.Send**; You will want to check this box too on the match found.
1. Additionally grant access to the (**Application Permission**) **Mail.ReadWrite** scope to allow the sending of large attachments (> 3MB in size). **Mail.ReadWrite** allows Apprise to prepares a Draft message with the large attachment so that it can be sent thereafter.
1. Additionally grant access to the (**Application Permission**) **User.Read.All** if you intend to pass in an ObjectID as the `source` and not an email. Apprise will use the ObjectID to acquire the email associated with the account; this is nessisary to be able to support the `From` portion of the email address.
1. Now you're good to go. 🙂

## Syntax

Valid syntax is as follows:

- `o365://{source}/{tenant_id}/{client_id}/{client_secret}/`
- `o365://{source}/{tenant_id}/{client_id}/{client_secret}/{targets}`

## Parameter Breakdown

| Variable      | Required | Description                                                                                                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source        | Yes      | The **Email** OR the \*\*ObjectID associated with your Azure Account you whish to send the email from.                                                                 |
| tenant_id     | Yes      | The **Tenant ID** Associated with your Azure Application you created. This can also be referred to as your **Directory ID**.                                           |
| account_email | Yes      | The **Email** Associated with your Azure account.                                                                                                                      |
| client_id     | Yes      | The **Client ID** (also referred to as an Application ID) associated with your Azure Application you created. This can also be referred to as your **Application ID**. |
| client_secret | Yes      | You will need to generate one of these; this can be done through the Azure portal (Also documented below).                                                             |
| from          | No       | If you want the email address _ReplyTo_ address to be something other then your own email address, then you can specify it here.                                       |
| to            | No       | This will enforce (or set the address) the email is sent To. By default the email is sent to the address identified by the `account_email`                             |

<!-- GLOBAL:SERVICE:PARAMS -->

:::note

- If no `targets` are specified, then the notification is just sent to the address identified by `{account_email}`
- Unfortunately the `client_secret` contains a lot of characters that can drastically conflict with standard URL rules (and thus Apprise might have difficulty detecting your client secret). The `?` and `@` characters can get generated by Microsoft and will almost definitely cause you issues.
  - Consider encoding this `client secret` before putting it into your Apprise URL. Encoding the URL can be as simple as just pasting it into the form on [this website](https://www.url-encode-decode.com/).
  - You can also just manually escape these characters on your Apprise URL yourself manually ([explained here](https://github.com/caronc/apprise/wiki/Troubleshooting#special-characters-and-url-conflicts)). Simply swap all instances of: - `?` with `%3F` - `@` with `%40`
    :::

## Examples

Send a email notification to our your Office 365 account:

```bash
# Assuming our {tenant_id} is ab-cd-ef-gh
# Assuming our {account_email} is chuck.norris@roundhouse.kick
# Assuming our {client_id} is zz-yy-xx-ww
# Assuming our {client_secret} is rt/djd/jjd
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   o365:///chuck.norris@roundhouse.kick/ab-cd-ef-gh/zz-yy-xx-ww/rt/djd/jjd
```
