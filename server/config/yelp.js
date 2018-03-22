'use strict';

require('dotenv').config();

let APIKey = process.env.YELP_API_KEY;

const yelp = require('yelp-fusion');

const client = yelp.client(APIKey);

module.exports = client;