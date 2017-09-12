export function scrollY(position) {
    return (dispatch) => {
        dispatch({
            type: 'scrollToYPosition',
            payload: position
        });
    };
}