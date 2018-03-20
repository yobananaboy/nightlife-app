export const user = (state = false, action) => {
    switch(action.type) {
        case 'UPDATE_USER':
            return action.user;
            
        default:
            return state;
    }
};