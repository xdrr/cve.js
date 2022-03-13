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
    postMessage({ data: 'ok' });
};

let serviceUri = 'https://cveawg-test.mitre.org/api';

get = (path, query) => {
    let opts = {
        headers: {
            'CVE-API-KEY': storage.creds.key,
            'CVE-API-ORG': storage.creds.org,
            'CVE-API-USER': storage.creds.user,
        }
    };

    let queryPath = '';

    if (query) {
        queryPath = new URLSearchParams(query).toString();
    }

    return fetch(`${serviceUri}/${path}?${queryPath}`, opts)
        .then(res => {
            if (res.ok) {
                postMessage({ data: res.body });
            } else {
                postMessage({ error: res.status });
            }
        });
};

self.onmessage = e => {
    switch (e.data.messageType) {
        case 'echo':
            postMessage({ data: 'echo' });
            break;
        case 'setCredentials':
            setCredentials(e.data.creds);
            break;
        case 'get':
            get(e.data.path, e.data.query);
            break;
    }
};
