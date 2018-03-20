import axios from 'axios';

import { updateUser } from './user';

export const barsAreLoading = (bool) => {
    return {
        type: 'BARS_ARE_LOADING',
        isLoading: bool
    };
};

export const barsHaveErrored = (bool) => {
  return {
        type: 'BARS_HAVE_ERRORED',
        hasErrored: bool
  };
};

export const barsFetchDataSuccess = (bars) => {
    return {
        type: 'BARS_FETCH_DATA_SUCCESS',
        bars
    };
};

export const barUpdated = (bar, id) => {
    return {
        type: 'BAR_UPDATED',
        bar,
        id
    };
};

// check if user has logged in and dispatch action if they are/arent
export const checkUserLoggedIn = (url) => {
    return (dispatch) => {
        // check the server for user
        axios.get(url)
            .then((res) => {
                // if server responds with user data, dispatch action accordingly, else dispatch user not logged in event
                res.data ? dispatch(updateUser(res.data)) : dispatch(updateUser(false));
                // make search if user logged in and has previous search
                if(res.data.lastSearch) {
                    dispatch(makeSearch('/getBars', res.data));
                }
            })
            .then((err) => {
                if(err) {
                    dispatch(updateUser(false));
                }
            });
    };
};

export const makeSearch = (url, user, inputSearch = null) => {
    return (dispatch) => {
        dispatch(barsAreLoading(true));
        
        // if user has just input search, that is the search term to use. Else use their last search
        let search = inputSearch ? inputSearch : user.lastSearch;
        
        // Send over user data if user logged in
        let data = user ?  { _id: user._id, lastSearch: search, img: user.img } : { _id: null, lastSearch: search };

        axios.post(url, data)
            .then((res) => {
                
                dispatch(barsAreLoading(false));
                
                dispatch(barsFetchDataSuccess(res.data));
                
            })
            .then((err) => {
                if(err) {
                    
                    console.log(err);
                    
                    dispatch(barsAreLoading(false));
                    
                    dispatch(barsHaveErrored(true));   
                }
            });
    };
};

export const userIsAttending = (user, barId, bars, url) => {
    return (dispatch) => {
        
        let data = { user, barId };
        
        axios.post(url, data)
            .then((res) => {
                // once we have a response with the updated bar, update the bars object returned in search
                let updatedBar = res.data;
                
                dispatch(barUpdated(updatedBar, barId));
                
            })
            .catch((err) => {
               if(err) {
                   
                 console.log(err);
                 dispatch((barsHaveErrored(true)));   
                 
               }
               
            });
    };
};