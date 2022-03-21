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

let serviceUri = 'https://cveawg-test.mitre.org/api';

clientReply = (e, msg) => {
    e.ports[0].postMessage(msg);
}

checkSession = (e) => {
    if (!('creds' in storage)) {
        clientReply(e, { error: "Not logged in." });
        return false;
    }

    return true;
}

get = (event) => {
    let { query, path } = event.data;

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
                clientReply(event, { data: res.body });
            } else {
                clientReply(event, { error: res.status });
            }
        });
};

self.onmessage = e => {
    switch (e.data.messageType) {
        case 'echo':
            clientReply(e, {"data": "echo"});
            break;
        case 'setCredentials':
            setCredentials(e.data.creds);
            clientReply(e, {"data": "ok"});
            break;
        case 'get':
            if (checkSession(e)) {
                get(e);
            }
            break;
    }
};
