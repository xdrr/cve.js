# CVE.js

CVE.js is a JS browser library for providing serverless access to the [CVE
services REST API](https://github.com/CVEProject/cve-services).

## Features

CVE.js runs in the browser and provides:

 * Serverless access to the CVE services API.
 * Secure credential management through [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
 * Multi-user session management and session timeouts.
 
 The following browsers are currently supported:
 
 * Google Chrome / Chromium
 * Firefox 
 * Opera
 * Microsoft Edge (>= v. 99 preferred)
 * Safari
 
 All versions of Internet Explorer are not supported.

## Installation

CVE.js can be integrated by the inclusion of the library in the appropriate component of your application.

```html
<script src="cve.js"></script>
```

Be sure to deploy `cve.js` and `sw.js` at the root of the component that will be
accessing `CveServices`. The Service Worker will assume this root as its scope
of control.

## How to use

The library exposes the `CveServices` class to the `window` namespace.

```js
let client = new CveServices("〈API-URL〉");
```

When an `〈API-URL〉` is not specified, it defaults to the production MITRE API.

### Session management

Before services may be requested from `CveServices`, a user must be logged in.

``` js
await client.login("user", "org", "key");
```

After login, the active user's session will expire in 1 hour.

The active user may be replaced by calling `login` with a different user's credentials:

``` js
await client.login("user2", "org_6", "keyabcdef");
```

The active session may be manually destroyed (along with the Service Worker in the user's browser) by calling `logout`:

``` js
await client.logout();
```

### API Methods

CVE services may be requested on behalf of the active user by calling the apppropriate API methods.

Each method returns a Promise resolving to the API return value upon success.

#### Retrieve organisation's reserved CVE IDs

```js
client.getCveIds()
    .then(ids => console.log(ids));
```

#### Get all CVE records

```js
await client.getCves();
```

#### Update a CVE record

```js
await client.updateCve('CVE-ABCD-EFGH', schema);
```

#### Create a new CVE record from a reserved ID

```js
await client.createCve('CVE-ABCD-EFGH', schema);
```

#### Update a CVE-ID record

```js
await client.updateCveId('CVE-ABC-EFGH', new_record);
```

#### Reserve CVE IDs - full options

```js
client.reserveCveIds({
    amount: 100,
    cve_year: 2021,
    short_name: "my_org_name",
    batch_type: "sequential"
})
.then(res => console.log(res));
```

#### Reserve a single CVE ID

Reserves a CVE ID for the current year (as determined by the browser local
time).

```js
await client.reserveCveId();
```

Or the caller can specify the year in which to reserve.

```js
await client.reserveCveId(2012);
```

#### Reserve n sequential CVE IDs

Reserve a number of sequential IDs for a given year.

```js
await client.reserveSeqCveIds(12, 2006);
```

Reserve a number of sequential IDs for the current year.

```js
await client.reserveSeqCveIds(99);
```

#### Reserve n nonsequential CVE IDs

Reserve a number of sequential IDs for a given year.

```js
await client.reserveNonSeqCveIds(12, 2009);
```

Reserve a number of nonsequential IDs for the current year.

```js
await client.reserveNonSeqCveIds(27182818284);
```

#### Retrieve a specific CVE ID

```js
client.getCveId("2021-2222-1111")
    .then(cve => console.log(cve));
```

#### Get organisation info 

```js
client.getOrgInfo()
    .then(org => console.log(org));
```

#### Get organisation's users

```js
client.getOrgUsers()
    .then(users => console.log(users));
```

#### Get organisation's allocation quota

```js
client.getOrgIdQuota()
    .then(quota => console.log(quota));
```

#### Get user record within organisation

```js
client.getOrgUser("user1")
    .then(user => console.log(user));
```

## License

This project is published under the MIT license. See `LICENSE` in the project
root directory for a full copy of the license.
