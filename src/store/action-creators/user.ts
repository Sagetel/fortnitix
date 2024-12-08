import { UserActionTypes } from '../../utils/types';

export const login = (email: string) => {
    return {
    type: UserActionTypes.LOGIN,
    payload: email,
}};


export const loginError = (error: string) => {
    return {
        type: UserActionTypes.LOGIN_ERROR,
        payload: error,
    }
}

export const logout = () => {
    return {
        type: UserActionTypes.LOGOUT,
    }
}