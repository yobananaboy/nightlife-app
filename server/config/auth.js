require('dotenv').config();

module.exports = {
    
    'facebookAuth': {
        'clientID'          : process.env.FB_CLIENT_ID.toString(),
        'clientSecret'      : process.env.FB_CLIENT_SECRET.toString(),
        'callbackUrl'       : process.env.FACEBOOK_URL.toString()
    }

};