import { UserActionTypes, LoginPayload } from '../../utils/types';

export const login = ({ email, uid }: LoginPayload) => {
    return {
    type: UserActionTypes.LOGIN,
    payload: {email, uid},
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