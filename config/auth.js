var port = process.env.PORT;
var facebookUrl = 'https://matts-nightlife-app.herokuapp.com/auth/facebook/callback';

module.exports = {
    
    'facebookAuth': {
        'clientID'          : '1951647031766559',
        'clientSecret'      : '0474a0a67f46d9d72b4fc854e7a0f3fd',
        'callbackUrl'       : facebookUrl
    }

};