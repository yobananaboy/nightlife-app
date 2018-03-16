import axios from 'axios';
import _ from 'underscore';

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

export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        user
    };
};

export const barsFetchDataSuccess = (bars) => {
    return {
        type: 'BARS_FETCH_DATA_SUCCESS',
        bars
    };
};

// check if user has logged in and dispatch action if they are/arent
export const checkUserLoggedIn = (url) => {
    return (dispatch) => {
        // check the server for user
        axios.get(url)
        .then((res) => {
            // if server responds with user data, dispatch action accordingly, else dispatch user not logged in event
            res.data.user ? dispatch(updateUser(res.data)) : dispatch(updateUser({}));
            // make search if user logged in and has previous search
            if(res.data.lastSearch) {
                dispatch(makeSearch('/getBars', res.data, res.data.lastSearch));
            }
        })
        .then((err) => {
            if(err) {
                dispatch(updateUser({}));
            }
        });
    };
};

export const makeSearch = (url, user, search) => {
    return (dispatch) => {
        dispatch(barsAreLoading(true));
        let data;
        _.findKey(user, (val, key) => {
            if(key === '_id') {
                return true;
            }
        }) ? data = { _id: user._id, lastSearch: search } : data = { _id: null, lastSearch: search };
        axios.post(url, data)
            .then((res) => {
                dispatch(barsAreLoading(false));
                let bars = res.data;
                dispatch(barsFetchDataSuccess(bars));
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

export const userIsAttending = (user, index, barId, bars, url) => {
    return (dispatch) => {
        console.log('attending');
        var data = {
          user,
          barId
        };
        axios.post(url, data)
            .then((res) => {
                // once we have a response with the updated bar, update the bars object returned in search
                let updatedBar = res.data;
                let newBarArr = bars.map((bar, ind) => {
                    if(ind !== index) {
                        return bar;
                    }
                    return Object.assign({}, bar, {
                        peopleGoing: updatedBar.peopleGoing
                    });
                });
                
                dispatch(barsFetchDataSuccess(newBarArr));
                
            })
            .catch((err) => {
               if(err) {
                 console.log(err);
                 dispatch((barsHaveErrored(true)));   
               }
            });
    };
};