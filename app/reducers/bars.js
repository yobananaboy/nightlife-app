const updateBarInBars = (bars, bar, id) => {
    // get index of the bar that has been updated
    let index = bars.findIndex(bar => bar._id == id);
    
    // replace bar at that index with the new data
    return bars.splice(index, 1, bar);
};

const errorInBar = (bars, id, err) => {
    // get index of bar that has errored
    let index = bars.findIndex(bar => bar._id == id);
    // create new object for bar which has errored, which has err
    let erroredBar = Object.assign({}, bars[index], { err });
    // replace bar at that index with new data
    return bars.splice(index, 1, erroredBar);
};

export const barsHaveErrored = (state = false, action) => {
    switch(action.type) {
        case 'BARS_HAVE_ERRORED':
            return action.err;
            
        default:
            return state;
    }
};

export const barsAreLoading = (state = false, action) => {
    switch(action.type) {
        case 'BARS_ARE_LOADING':
            return action.isLoading;
            
        default:
            return state;
    }  
};

export const bars = (state = [], action) => {
    switch(action.type) {
        case 'BARS_FETCH_DATA_SUCCESS':
            return action.bars;
            
        case 'BAR_UPDATED':
            return updateBarInBars(state, action.bar, action.id);
            
        case 'ERROR_UPDATING_BAR':
            return errorInBar(state, action.id, action.err);
            
        default:
            return state;
    }
};