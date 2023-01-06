import { signUpActions } from "./signUpSlice";

// Пока не используется

export const register = data => {
    return dispatch => {
        dispatch(signUpActions.register(data));
    };
};