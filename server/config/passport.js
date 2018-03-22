const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./auth');
const database = require('./database');
const Users = database.Users;

module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });
    
    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });

    
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackUrl,
        profileFields: ['id', 'photos']
    },
        // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

            return done(null, profile);
        });

    }));

};