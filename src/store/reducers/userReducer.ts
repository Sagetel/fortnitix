import { TUserAction, UserActionTypes, userState } from "../../utils/types"

const initialState: userState = {
    userEmail: '',
    userIsLogedIn: false,
    error: null,
}

export const userReducer = (state = initialState, action: TUserAction): userState=> {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return {
                ...state,
                userIsLogedIn: true,
                userEmail: action.payload,
                error: null
            }
        case UserActionTypes.LOGIN_ERROR: 
            return {
                ...state,
                userIsLogedIn: false,
                error: action.payload
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                userIsLogedIn: false,
                userEmail: '',
                error: null
            }
        default:
            return state;
    }
}