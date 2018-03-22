import bars_controller from './controllers/bars';
import user_controller from './controllers/user';


module.exports = function(app, passport) {

    // user searches for bars
    app.post('/getBars', bars_controller.get_all_bars);
    
    // Facebook authentication
    app.get('/login', passport.authenticate('facebook', { scope : ['public_profile'] }));
    
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/' }));
    
    // for logging user out  
    app.get('/logout', user_controller.logout);
    
    // checking if user is logged in
    app.get('/user', user_controller.get_user);
    
    app.post('/userIsAttending', bars_controller.user_is_attending);
    
    app.get('*', bars_controller.render_data);
    
};