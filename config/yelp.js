'use strict';

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const token = process.env.ACCESS_TOKEN;

const yelp = require('yelp-fusion');

const client = yelp.client(token);

module.exports = client;