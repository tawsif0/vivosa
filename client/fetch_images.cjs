const https = require('https');
const fs = require('fs');

https.get('https://vivosa.co.uk/leather-lining/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        let regex = /https:\/\/[^"'\s]+?(?:jpg|png|webp)/g;
        let m;
        let urls = new Set();
        while ((m = regex.exec(data)) !== null) {
            urls.add(m[0]);
        }
        console.log(Array.from(urls).join('\n'));
    });
}).on('error', (err) => {
    console.error('Error: ', err.message);
});
