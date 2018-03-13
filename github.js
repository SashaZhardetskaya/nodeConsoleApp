const https = require('https');

function getRepos(username, done) {

    if(!username) return done (new Error('please, write username'));

    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/repos`,
        headers: { 'User-Agent': 'SashaZhardetskaya' }
    };

    const req = https.get(options, res => {
        // console.log(res.statusCode, res.statusMessage) //1

        res.setEncoding('utf-8');

        // res.on('data', data => console.log(data, data.length)) //2

        if(res.statusCode === 200) {
            let body = '';

            res.on('data', data => body += data);

            res.on('end', () => {
                const result = JSON.parse(body);
                done(null, result)
            })
        } else {
            done(new Error(`Couldn't receive data from server (${res.statusCode} ${res.statusMessage})`))
        }


    });

    // req.on('error', error => done(error)); //3 Появ-ся если отправить неправильный запрос, например вместо options написать несущ-й url
    req.on('error', error => done(new Error(`couldn't send request (${error.message})`)));
}

module.exports = {
    getRepos
};