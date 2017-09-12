const INITIAL_STATE = {scrollToY:0}

export const scroll = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'scrollToYPosition':
            return{...state,scrollToY: action.payload}
        default:
            return state;
    }
}