const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.DB_PORT;


const uri = `mongodb://${user}:${password}@${host}:${port}/nightlife-app`;
mongoose.connect(uri, {useMongoClient: true});

var Schema = mongoose.Schema;
// create user schema in user collection
var usersSchema = new Schema({
   _id: String,
   lastSearch: String,
   img: String,
   token: String
}, {collection: 'users'});

// create bar schema in bar collection
var barsSchema = new Schema({
   _id: String,
   name: String,
   url: String,
   rating: Number,
   price: String,
   location: {
       address1: String,
       city: String,
       zip_code: String
   },
   peopleGoing: []
}, {collection: 'bars'});

var Users = mongoose.model('Users', usersSchema);
var Bars = mongoose.model('Bars', barsSchema);

// export
module.exports = {
    Users,
    Bars
};