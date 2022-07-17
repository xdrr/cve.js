# CVE.js

CVE.js is a JS client-side library for secure, serverless access to the [CVE services REST API](https://github.com/CVEProject/cve-services).

## Features

CVE.js runs in the browser and provides:

 * Serverless access to the MITRE [CVE services API](https://github.com/CVEProject/cve-services).
 * Secure credential management solution using [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
 * Multi-user session management and session timeouts.
 * Broadcast event notification (similar to push notifications).
 
 The following browsers are currently supported:
 
 * Google Chrome / Chromium
 * Firefox 
 * Opera
 * Microsoft Edge (>= v. 99 preferred)
 * Safari
 
 All versions of Internet Explorer are *not supported*.

## Installation

CVE.js can be integrated by the inclusion of the library in the appropriate component of your application.

```html
<script src="cve.js"></script>
```

Typically `cve.js` and `sw.js` are deployed at the root of the component that will provide access to the CVE Services API. The Service Worker will assume this root as its scope of control. If you need to install `sw.js` in a different location, be sure to specify its location each time you initialise a handle (see [Usage](#2-usage)).

## Usage

Initialise a new handle to `CveServices`:

```js
let client = new CveServices();
```

Want to specify a custom API end point for the MITRE CVE Services API? Need to customise the location where the service worker is installed? These can be customised when initialising the handle.

``` js
let client = new CveServices(<API-endpoint>,<sw-installation-path>);
```

### Session management

Before services may be requested from `CveServices`, a user must be logged in. An error will be returned if no user is logged in or the last user's session timeed out.

``` js
await client.login("user", "org", "key");
```

The active user may be replaced by calling `login` with a different user's credentials:

``` js
await client.login("user2", "org_6", "keyabcdef");
```

The active session may be manually destroyed (along with the Service Worker in the user's browser) by calling `logout`:

``` js
await client.logout();
```

##### Timeout

After login, the active user will be *automatically logged out* after 1 hour.

### Event notifications

Event notifications are provided by the [Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) Web API. 

To subscribe a handle to broadcast event, use the `on` method like so:

``` js
client.on("logout").then(msg => alert(msg.message));
```

## License

This project is published under the MIT license. See `LICENSE` in the project root directory for a full copy of the license.
