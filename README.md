# CVE.js - ECMAScript 6 client-side library for the CVE REST API

Provides an ECMAScript 6 client-side library for accessing the [CVE REST
API](https://github.com/CVEProject/cve-services), with secure local credential
storage.

## Synopsis

```
<script src="cve.js"></script>
```

## Usage

The library exposes to the global scope the class `CveServices` which may be
instantiated in the browser:

```
let client = new CveServices("API-URL");
```

When an URI is not specified, it defaults to the production MITRE API.

## Browser Support

CVE.js uses the Browser Credential API to store user credentials with a fallback
to LocalStorage to achieve support of all modern browsers. Those tested include:
Chrome / Chromium, Firefox, Safari, Opera.

Should a browser (such as Firefox) achieve full support of the Browser
Credential API, users will be automatically prompted to reenter their
credentials so they made be stored in this method.

## Authentication

When an API method is accessed and authenticating material has not been stored
in the client-side, the user will be prompted to provide this information and it
will be stored using either the Browser Credential API (if supported) or AES-GCM
encrypted values in LocalStorage.

### Methods

All methods return Promises which resolve once (a) the authenticating material
is both stored and retrieved, (b) the API call has returned from the server.

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
