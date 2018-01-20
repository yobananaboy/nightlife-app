import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import configureStore from './app/store/configureStore';

import { Provider } from 'react-redux';

import App from './app/component/App';

let store = configureStore();

module.exports = function(app, yelpClient, database, passport, async, _) {
    const Bars = database.Bars;
    const Users = database.Users;
    // client posts search info
    
    //http://bluebirdjs.com/docs/api/promise.map.html
    
    // user searches for bars
    app.post('/getBars', (request, response) => {
        // make request to yelp client for users search
        yelpClient.search({
          categories:'bars,pubs,beerbar,cocktailbars',
          location: request.body.lastSearch
        })
            .then(res => {
            // loop through response, which should be array of businesses
            var getBarData = (bar, done) => {
                Bars.findOne({_id: bar.id}, (err, barOnDatabase) => {
                        let newBar;
                        if(err) {
                            console.log(err);
                            response.setHeader('Content-Type', 'application/json');
                            response.send(JSON.stringify({error: true}));
                        } else {
                          // voters is empty array
                          let peopleGoing = [];
                          // unless bar is on database - so voters must have been added
                          if(barOnDatabase) {
                            peopleGoing = barOnDatabase.peopleGoing;
                          }
                          newBar = {
                              _id: bar.id,
                              name: bar.name,
                              url: bar.url,
                              rating: bar.rating,
                              price: bar.price,
                              location: {
                                  address1: bar.location.address1,
                                  city: bar.location.city,
                                  zip_code: bar.location.zip_code,
                              },
                              peopleGoing: peopleGoing,
                              img: bar.image_url
                          };
                        }
                        return done(null, newBar);
                });
            };
            
            async.map(res.jsonBody.businesses, getBarData, (err, bars) => {
                if(err) console.log(err);
                // once we have bars, update user on database, if user is logged in
                if(request.body._id) {
                    Users.update({_id: request.body._id}, { $set: { _id: request.body._id, lastSearch: request.body.lastSearch }}, {upsert: true}, (err) => {
                        if(err) {
                            console.log(err);
                        }
                        console.log('updated user');
                        // send bars data
                        response.setHeader('Content-Type', 'application/json');
                        response.send(JSON.stringify(bars));
                    });
                } else {
                        // send bars data
                        response.setHeader('Content-Type', 'application/json');
                        response.send(JSON.stringify(bars));
                    }
                });
            
        }).catch(e => {
            console.log(e);
        });
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
        console.log(req);
        if (req.user === undefined) {
            // The user is not logged in
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({}));
        } else {
            
            console.log('loading user');
            console.log(req.user);
            Users.findOne({_id: req.user._id}, function(err, user) {
               if(err) console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(user));
            });
        }
    });
    
    app.post('/userIsAttending', (request, response) => {
        let barId = request.body.barId;
        let user = request.body.user;
        // search for bar user clicked to attend
        Bars.findOne({_id: barId}, (err, barOnDatabase) => {
           if(err) console.log(err);
           // if bar is on databse
           if(barOnDatabase) {
               // find out if user is in the array of people going and remove if they are
               if(_.find(barOnDatabase.peopleGoing, personGoing => {
                   return personGoing._id === user._id;
               })) {
                   let peopleGoing = barOnDatabase.peopleGoing;
                   // filter array if user clicking attending matches person in people going
                   peopleGoing = _.filter(peopleGoing, personGoing => {
                       return personGoing._id !== user._id;
                   });
                   barOnDatabase.peopleGoing = peopleGoing;
                   // save updated bar
                   barOnDatabase.save((err) => {
                       if(err) console.log(err);
                       response.setHeader('Content-Type', 'application/json');
                       response.send(JSON.stringify(barOnDatabase));
                   });
               } else {
                   // otherwise, user needs to be added to array of people going
                   let peopleGoing = barOnDatabase.peopleGoing;
                   // they just need to be pushed
                   peopleGoing.push(user);
                   barOnDatabase.peopleGoing = peopleGoing;
                   // save updated bar
                   barOnDatabase.save((err) => {
                       if(err) console.log(err);
                       response.setHeader('Content-Type', 'application/json');
                       response.send(JSON.stringify(barOnDatabase));
                   });
               }
           } else {
               // else if bar is not on database create a new one and add first person going
               let newBar = new Bars();
               newBar._id = barId;
               newBar.peopleGoing = new Array(user);
               newBar.save((err) => {
                   if(err) console.log(err);
                   response.setHeader('Content-Type', 'application/json');
                   response.send(JSON.stringify(newBar));
               });
           }
           
        });
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