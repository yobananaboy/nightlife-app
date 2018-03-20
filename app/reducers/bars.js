const updateBarInBars = (bars, bar, id) => {
    let index = bars.findIndex(bar => bar._id == id);
    
    return bars.splice(index, 1, bar);
};

export const barsHaveErrored = (state = false, action) => {
    switch(action.type) {
        case 'BARS_HAVE_ERRORED':
            return action.hasErrored;
            
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
            
        default:
            return state;
    }
};

export const user = (state = false, action) => {
    switch(action.type) {
        case 'UPDATE_USER':
            return action.user;
            
        default:
            return state;
    }
};