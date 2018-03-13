const https = require('https');

function getRepos(username, done) {

    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/repos`,
        headers: { 'User-Agent': 'SashaZhardetskaya' }
    };

    https.get(options, res => {
        // console.log(res.statusCode, res.statusMessage) //1

        res.setEncoding('utf-8');

        // res.on('data', data => console.log(data, data.length)) //2

        let body = '';

        res.on('data', data => body += data);

        res.on('end', () => {
            const result = JSON.parse(body);
            done(null, result)
        })
    })
}

module.exports = {
    getRepos
};