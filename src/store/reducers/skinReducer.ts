export interface Skin {
    name: string;
    image: string;
}

export enum ActionTypes {
    FETCH_SKINS = 'FETCH_SKINS',
    FETCH_SKINS_SUCCESS = 'FETCH_SKINS_SUCCESS',
    FETCH_SKINS_ERROR = 'FETCH_SKINS_ERROR'
}

interface SkinsState {
    skins: Skin[];
    loading: boolean;
    error: null | string;
}

const initialState: SkinsState = {
    skins: [],
    loading: false,
    error: null
}

interface FetchSkinsAction {
    type: ActionTypes.FETCH_SKINS;
}

interface FetchSkinsSuccessAction {
    type: ActionTypes.FETCH_SKINS_SUCCESS;
    payload: Skin[];
}

interface FetchSkinsErrorAction {
    type: ActionTypes.FETCH_SKINS_ERROR;
    payload: string;
}

export type SkinAction = FetchSkinsAction | FetchSkinsSuccessAction | FetchSkinsErrorAction;


export const skinsReducer = (state = initialState, action: SkinAction): SkinsState => {
    switch (action.type) {
        case ActionTypes.FETCH_SKINS:
            return {
                ...state,
                skins: [],
                loading: true,
                error: null
            };
        case ActionTypes.FETCH_SKINS_SUCCESS:
            return {
                ...state,
                skins: action.payload,
                loading: false,
                error: null
            };
        case ActionTypes.FETCH_SKINS_ERROR:
            return {
                ...state,
                skins: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
