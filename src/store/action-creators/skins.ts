import { Dispatch } from 'redux';
import { fetchShop } from '../../utils/apiFortnite';
import { IFetchShopFailureAction,
  IFetchShopRequestAction,
  IFetchShopSuccessAction,
  ShopAction, ShopActionTypes,
  ShopItem } from '../../utils/types';

export const fetchShopRequest = (): IFetchShopRequestAction => ({
  type: ShopActionTypes.FETCH_SHOP_REQUEST,
  payload: null,
});

export const fetchShopSuccess = (shop: ShopItem[]): IFetchShopSuccessAction => ({
  type: ShopActionTypes.FETCH_SHOP_SUCCESS,
  payload: shop,
});

export const fetchShopFailure = (error: string): IFetchShopFailureAction => ({
  type: ShopActionTypes.FETCH_SHOP_FAILURE,
  payload: error,
});

export const fetchShopAsync = () => {
  return async (dispatch: Dispatch<ShopAction>) => {
    dispatch(fetchShopRequest());
    try {
      const data = await fetchShop();
      dispatch(fetchShopSuccess(data)); 
    } catch (error) {
      dispatch(fetchShopFailure('Ошибка'));
    }
  };
};
