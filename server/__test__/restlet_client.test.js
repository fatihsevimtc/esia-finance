const OAuth = require("oauth-1.0a");
const crypto = require("crypto-js");
const axios = require("axios");
const MockAdapter = require('axios-mock-adapter');

require('dotenv').config();

const { CONSUMER_KEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT_ID, RESTLET_URL } = process.env;

const oauth = OAuth({
    consumer: {
        key: CONSUMER_KEY,
        secret: CONSUMER_SECRET,
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
        return crypto.HmacSHA256(base_string, key).toString(crypto.enc.Base64);
    },
});

const token = {
    key: TOKEN_ID,
    secret: TOKEN_SECRET,
}

const requestData = {
    url: RESTLET_URL,
    method: 'post',
}

const authHeader = oauth.toHeader(oauth.authorize(requestData, token));
const expectedAuthorizationHeader = `${authHeader.Authorization}, realm="${ACCOUNT_ID}"`;

const headers = {
    'Authorization': expectedAuthorizationHeader,
    'Content-Type': 'application/json'
}

const options = {
    headers: headers,
    method: 'post',
    url: RESTLET_URL,
    data: {
        patient: 'testPatient',
    },
};


const mock = new MockAdapter(axios);
mock.onPost(RESTLET_URL).reply(200, {
    patient: 'testPatient',
});

test('API request is made with correct headers', async () => {

    await require('../api/restlet_client').connectNetsuite('testPatient'); 
    const requestHeaders = mock.history.get[0].headers;
    const expectedHeaders = {
        'Authorization': expect.stringContaining('OAuth'),
        'Content-Type': 'application/json',
    };
    expect(requestHeaders).toMatchObject(expectedHeaders);

});
