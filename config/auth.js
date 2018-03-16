var facebookUrl = 'https://matts-nightlife-app.herokuapp.com/auth/facebook/callback';
require('dotenv').config();

module.exports = {
    
    'facebookAuth': {
        'clientID'          : process.env.FB_CLIENT_ID.toString(),
        'clientSecret'      : process.env.FB_CLIENT_SECRET.toString(),
        'callbackUrl'       : facebookUrl
    }

};