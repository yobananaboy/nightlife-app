const database = require('../../config/database');

const Users = database.Users;

exports.logout = (req, res) => {
	req.logout();
    res.redirect('/');
};

exports.get_user = (req, res) => {
    
    if (req.user != undefined) {
            
            Users.findById(req.user.id)
                .then(user => {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send({
                            _id: req.user.id,
                            img: req.user.photos[0].value,
                            lastSearch: ''
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.send(false);
                });
            
        } else {

            res.send(false);
                
        }
        
};

exports.update_user = (req, res) => {
    Users.update({_id: req.body._id}, { _id: req.body._id, lastSearch: req.body.lastSearch, img: req.body.img }, { upsert: true })
        .catch(err => console.log(err));
};