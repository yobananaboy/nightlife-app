const updateBarInBars = (bars, updatedBar, id) => {

    return bars.map((bar, index) => {
        if(bar._id != id) {
            return bar;
        }
        
        return {
            ...bar,
            peopleGoing: updatedBar.peopleGoing,
            err: false
        };
    });
    
};

const errorInBar = (bars, id, err) => {
    
    return bars.map((bar, index) => {
        if(bar._id != id) {
            return bar;
        }
        
        return {
            ...bar,
            err
        };
        
    });
    
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