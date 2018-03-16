import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import configureStore from './app/store/configureStore';

import { Provider } from 'react-redux';

import App from './app/component/App';

let store = configureStore();

module.exports = function(app, yelpClient, database, passport, async, _) {
    const Bars = database.Bars;
    const Users = database.Users;
    
    const getAllBars = (location, req, res) => {
        
        // yelp search
        yelpClient.search({
            categories:'bars,pubs,beerbar,cocktailbars',
            location
        })
            .then(result => {
                // handle search term with no results
                
                // get bar data if loaded okay
                let barData = result.jsonBody.businesses;
                
                // to find bars on database create an array of promises
                let barPromises = barData.map(bar => {
                    // find bar by id
                    return Bars.findById(bar.id);
                });

                let bars = Promise.all(barPromises)
                    .then(bars => {
                        // once all promises are resolved, map bar data received
                        bars = bars.map((bar, index) => {
                            // find out who clicked attending
                            let peopleGoing = [];
                            // if the bar was found on db and it has people going then update
                            if(bar && bar.peopleGoing) peopleGoing = bar.peopleGoing;
                            
                            return {
                                  _id: barData[index].id,
                                  name: barData[index].name,
                                  url: barData[index].url,
                                  rating: barData[index].rating,
                                  price: barData[index].price,
                                  location: {
                                      address1: barData[index].location.address1,
                                      city: barData[index].location.city,
                                      zip_code: barData[index].location.zip_code,
                                  },
                                  peopleGoing,
                                  img: barData[index].image_url
                            };
                        });
                        
                        res.send(bars);
                        
                    })
                    .catch(err => {
                        console.log(err);
                    });
                
            })
            // handle error
            .catch(err => console.log(err));
        
    };
    
    
    // user searches for bars
    app.post('/getBars', (req, res) => {
        let search = req.body.lastSearch;
        
        getAllBars(search, req, res);
        
        if (req.body._id) {
            Users.update({_id: req.body._id}, { $set: { _id: req.body._id, lastSearch: req.body.lastSearch }}, {upsert: true})
                .catch(err => console.log(err));
        }

    });
    
    
    // Facebook authentication
    app.get('/login', passport.authenticate('facebook', {scope : ['public_profile']}));
    
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/' }));
    
    // for logging user out  
    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });
    
    // checking if user is logged in
    app.get('/user', (req, res) => {
        if (req.user === undefined) {
            // The user is not logged in
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({}));
        } else {
            
            console.log('loading user');
            Users.findOne({_id: req.user._id}, function(err, user) {
               if(err) console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(user));
            });
        }
    });
    
    const saveBarAndSendData = (bar, res) => {
        bar.save()
            .then(res => res.send(bar))
            .catch(err => console.log(err));
    };
    
    app.post('/userIsAttending', (req, res) => {
        let barId = req.body.barId;
        let user = req.body.user;
        // search for bar user clicked to attend
        Bars.findbyID(barId)
            .then(bar => {
                // if bar on database
                if (bar) {
                    // find out if user is in the array of people going and remove if they are    
                    // get index
                    let index = _.find(bar.peopleGoing, personGoing => {
                        return personGoing._id === user._id;
                    });
                    // if not in array, push to array
                    if(index == -1) {
                        bar.peopleGoing.push(user);
                    }
                    // else splice to remove
                    else {
                        bar.peopleGoing.splice(index, 1);
                    }
                    
                    saveBarAndSendData(bar, res);
                    
                }
                // else if bar not on database
                else {
                    let bar = new Bars({
                        _id: barId,
                        peopleGoing: [user],
                    });
                    
                    saveBarAndSendData(bar, res);
                    
                }
                
            })
            .catch(err => console.log(err));
            
    });
    
    app.get('*', (req, res) => {
        let data = store.getState();
        const content = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        );
        res.render('index', {title: 'Express', data: JSON.stringify(data), content });
    });
    
    
};