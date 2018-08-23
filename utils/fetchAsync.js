const fetch = require('node-fetch');

async function fetchAsync(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = fetchAsync;
