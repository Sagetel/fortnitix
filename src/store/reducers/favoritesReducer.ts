import { FavoritesActionTypes, IFavoritesState } from "../../types"
import { TFavoritesAction } from "../../types"

const initialState: IFavoritesState  = {
    favorites: [],
    error: null
}

export const favoritesReducer = (state = initialState, action: TFavoritesAction): IFavoritesState => {
    switch (action.type) {
        case FavoritesActionTypes.CREATE_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
                error: null
            }
        case FavoritesActionTypes.CREATE_FAVORITE_ERROR:
            return {
                ...state, 
                error: action.payload 
            }
        // case 'REMOVE_FAVORITE':
        //     return {
        //         ...state,
        //         favorites: state.favorites.filter(favorite => favorite.id !== action.payload)
        //     }
        case FavoritesActionTypes.GET_FAVORITE:
            return {
                ...state,
                favorites: action.payload,
            }  
        case FavoritesActionTypes.GET_FAVORITE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}