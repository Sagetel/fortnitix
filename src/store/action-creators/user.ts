import { UserActionTypes } from '../../utils/types';

export const login = () => {
    return {
    type: UserActionTypes.LOGIN,
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