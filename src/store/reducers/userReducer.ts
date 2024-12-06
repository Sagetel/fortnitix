
interface userState {
    userIsLogedIn: boolean;
}

const initialState: userState = {
    userIsLogedIn: false,
}


export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userIsLogedIn: true
            }
        case 'LOGOUT':
            return {
                ...state,
                userIsLogedIn: false
            }
        default:
            return state;
    }
}