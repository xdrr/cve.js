//
// CveServices - Service Worker Middleware
// Filename: sw.js
//
// Author: Ben N
//
// Description: Handles exchange of API requests with credentials.
//

const storage = {};

setCredentials = (creds) => {
    storage.creds = creds;
};

let serviceUri = 'https://cveawg-test.mitre.org/';

clientReply = (e, msg) => {
    e.ports[0].postMessage(msg);
};

checkSession = (e) => {
    if (!('creds' in storage)) {
        clientReply(e, { error: "Not logged in." });
        return false;
    }

    return true;
};

defaultOpts = () => {
    return {
        headers: {
            'content-type': 'application/json',
            'CVE-API-KEY': storage.creds.key,
            'CVE-API-ORG': storage.creds.org,
            'CVE-API-USER': storage.creds.user,
        },
    };
};

getURL = (path, query) => {
    let url = new URL(`/api/${path}`, serviceUri);

    if (query) {
        for (const [k, v] of Object.entries(query)) {
            url.searchParams.append(k, v);
        }
    }

    return url.toString();
};

doFetch = (event, url, opts) => {
    return fetch(url, opts)
        .then(res => {
            if (res.ok) {
                clientReply(event, { data: res.body });
            } else {
                clientReply(event, { error: res.status });
            }
        });
};

requestService = (event) => {
    let { query, path, method } = event.data;

    let opts = defaultOpts();
    let url = getURL(path, query);

    if (method in ['PUT', 'POST'] && 'body' in event.data) {
        opts.method = method;
        opts.body = JSON.stringify(event.data.body);
    }

    return doFetch(event, url, opts);
};

self.onmessage = e => {
    switch (e.data.type) {
        case 'echo':
            clientReply(e, {"data": "echo"});
            break;
        case 'login':
            setCredentials(e.data.creds);
            clientReply(e, {"data": "ok"});
            break;
        case 'request':
            if (checkSession(e)) {
                requestService(e);
            }
            break;
    }
};
