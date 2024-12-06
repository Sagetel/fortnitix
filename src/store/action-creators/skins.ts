import { Dispatch } from 'redux';
import { SkinAction } from '../reducers/skinReducer';
import { ActionTypes } from '../reducers/skinReducer';

export const fetchSkins = () => {
    return async (dispatch: Dispatch<SkinAction>) => {
        try {
            dispatch({ type: ActionTypes.FETCH_SKINS });
        } catch (error) {
            dispatch({ type: ActionTypes.FETCH_SKINS_ERROR, payload: 'Произошла ошибка' })
        }
    }
}