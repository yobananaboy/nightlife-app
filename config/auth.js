var facebookUrl = 'https://matts-nightlife-app.herokuapp.com/auth/facebook/callback';
require('dotenv').config();

module.exports = {
    
    'facebookAuth': {
        'clientID'          : process.env.FB_CLIENT_ID,
        'clientSecret'      : process.env.FB_CLIENT_SECRET,
        'callbackUrl'       : facebookUrl
    }

};