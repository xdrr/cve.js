# CVE.js

CVE.js is a JS client-side library for secure, serverless access to the [CVE services REST API](https://github.com/CVEProject/cve-services).

## Features

CVE.js runs in the browser and provides:

 * Serverless access to the MITRE [CVE services API](https://github.com/CVEProject/cve-services).
 * Secure credential management solution using [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
 * Multi-user session management and session timeouts.
 
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

## API Methods

Once a handle is established, CVE services may be requested on behalf of the active user by calling the apppropriate API methods.

Each method returns a Promise resolving to the API return value upon success.

### CVE IDs

#### Retrieve the current organisation's reserved CVE IDs

```js
client.getCveIds()
    .then(ids => console.log(ids));
```

#### Update a CVE-ID record

```js
await client.updateCveId('CVE-ABCD-EFGH', {...schema});
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

Reserves a CVE ID for the current year (as determined by the browser local time).

```js
await client.reserveCveId();
```

Alternatively, the caller may specify the year in which to reserve.

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

### CVEs

#### Get all CVE records

```js
await client.getCves();
```

#### Get a single CVE record

``` js
await client.getCve();
```

#### Update a CVE record

```js
await client.updateCve('CVE-ABCD-EFGH', schema);
```

#### Create a new CVE record from a reserved ID

```js
await client.createCve('CVE-ABCD-EFGH', {...schema});
```

#### Create a new CVE record in reject status

``` js
await client.createRejectCve('CVE-ABCD-EFGH', {...schema});
```

#### Update a CVE record in reject status

``` js
await client.updateRejectCve('CVE-ABCD-EFGH', {...schema});
```

### Organisations

#### Get organisation info 

```js
await client.getOrgInfo()
    .then(org => console.log(org));
```

#### Update organisation info

``` js
await client.updateOrgInfo({...orgInfo});
```

#### Create new user in current organisation

``` js
await client.createOrgUser({...userInfo});
```

#### Update existing organisation user

``` js
await client.updateOrgUser('username', {...newUserInfo});
```

#### Get organisation users

```js
await client.getOrgUsers()
    .then(users => console.log(users));
```

#### Get organisation's allocation quota

```js
await client.getOrgIdQuota()
    .then(quota => console.log(quota));
```

#### Get organisation user record

```js
await client.getOrgUser("user1")
    .then(user => console.log(user));
```

## License

This project is published under the MIT license. See `LICENSE` in the project root directory for a full copy of the license.
