import { AnyAction } from 'redux';
import { SkinState } from '../../utils/types';

const initialState: SkinState = {
  shop: [],
  loading: false,
  error: null,
};

export const skinsReducer = (state = initialState, action: AnyAction): SkinState => {
  switch (action.type) {
    case 'FETCH_SHOP_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SHOP_SUCCESS':
      return { ...state, loading: false, shop: action.payload };
    case 'FETCH_SHOP_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
