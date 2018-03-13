const https = require('https');

function getRepos(username, done) {

    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/repos`,
        headers: { 'User-Agent': 'SashaZhardetskaya' }
    };

    https.get(options, res => {
        console.log(res.statusCode, res.statusMessage)
    })
}

module.exports = {
    getRepos
};