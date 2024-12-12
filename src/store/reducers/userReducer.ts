import { TUserAction, UserActionTypes, userState } from "../../utils/types"

const initialState: userState = {
    userEmail: '',
    userUId: '',
    userIsLogedIn: false,
    error: null,
}

export const userReducer = (state = initialState, action: TUserAction): userState=> {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return {
                ...state,
                userIsLogedIn: true,
                userEmail: action.payload.email,
                userUId: action.payload.uid,
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