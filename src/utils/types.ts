
export interface IFavoritesState {
    favorites: any[];
    error: null | string
}


export enum FavoritesActionTypes {
    CREATE_FAVORITE = 'CREATE_FAVORITE',
    CREATE_FAVORITE_ERROR = 'CREATE_FAVORITE_ERROR',
    GET_FAVORITE = 'GET_FAVORITE',
    GET_FAVORITE_ERROR = 'GET_FAVORITE_ERROR',
}

export interface IFavoritesAction {
    type: FavoritesActionTypes
    payload: any
}

interface ICreateFavoriteAction {
    type: FavoritesActionTypes.CREATE_FAVORITE,
    payload: any[]
}

interface ICreateFavoriteErrorAction {
    type: FavoritesActionTypes.CREATE_FAVORITE_ERROR,
    payload: any
}

interface IGetFavoriteAction {
    type: FavoritesActionTypes.GET_FAVORITE,
    payload: any[]
}

interface IGetFavoriteErrorAction {
    type: FavoritesActionTypes.GET_FAVORITE_ERROR,
    payload: any
}

export type TFavoritesAction = ICreateFavoriteAction | ICreateFavoriteErrorAction | IGetFavoriteAction | IGetFavoriteErrorAction


export interface userState {
    userIsLogedIn: boolean;
    error: null | string;
}



export enum UserActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT = 'LOGOUT',
}

export interface IUserAction {
    type: UserActionTypes
    payload: any
}

interface IUserLoginAction {
    type: UserActionTypes.LOGIN,
    payload: any
}

interface IUserLoginErrorAction {
    type: UserActionTypes.LOGIN_ERROR,
    payload: string
}

interface IUserLogoutAction {
    type: UserActionTypes.LOGOUT,
    payload: null | string
}

export type TUserAction = IUserAction | IUserLoginAction | IUserLoginErrorAction | IUserLogoutAction
