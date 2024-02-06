const OAuth = require("oauth-1.0a");
const crypto = require("crypto-js");
const axios = require("axios");
const logger = require('../services/logger');

require('dotenv').config();
const { CONSUMER_KEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT_ID, RESTLET_URL } = process.env;

async function postToNetsuite(data) {
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
    const headers = {
        'Authorization': `${authHeader.Authorization}, realm="${ACCOUNT_ID}"`,
        'Content-Type': 'application/json'
    }

    const options = {
        headers: headers,
        method: 'post',
        url: RESTLET_URL,
        data: {
            payload: data,
        },
    };


    try {

        const response = await axios(options);

        if (response.status === 200) {
            //logger.info(response.data);

            return response.data;
        } else {
            logger.error(`Error in postToNetsuite: ${response.status}`);
        }


    } catch (err) {
        logger.error(err);
    }
}

module.exports = { postToNetsuite };
