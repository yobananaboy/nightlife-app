'use strict';

require('dotenv').config();

const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_API_KEY);

module.exports = client;