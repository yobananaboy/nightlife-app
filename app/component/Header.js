import React from 'react';
import emoji from 'react-easy-emoji'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


export const Header = (props) => {
    // if there is not a user, header will display log in button.
    // if user logged in, profile pic and logout button displays
    let logInAndOut = <a href="/login"><button className="btn btn-primary">Log in with Facebook</button></a>;
    if(!isEmpty(props.user)) {
        logInAndOut = <a href="/logout"><button className="btn btn-secondary"><img src={props.user.img} alt="profile pic" /> Log out</button></a>;
    }
    return(
        <div className="row justify-content-center">
            <div className="col-12 col-md-10 header">
                <h1>Matt's nightlife app</h1>
                <h1>{emoji("😀 🍺 🍷 🍾" ) }</h1>
                <p>Search for bars in your area and let friends know you are going.</p>
                {logInAndOut}
            </div>
        </div>
    );
};