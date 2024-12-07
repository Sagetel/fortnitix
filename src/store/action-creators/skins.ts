import { AppThunk } from '../store';
import { ActionTypes } from '../reducers/skinReducer';
import axios from 'axios';

export const fetchSkins = (limit: number): AppThunk => async (dispatch) => {
  dispatch({ type: ActionTypes.FETCH_SKINS });
  try {
    const response = await axios.get('https://fortnite-api.com/v2/cosmetics/br');

    if (response.status === 200) {
      const limitedData = response.data.data
        .filter((item: any) => item.type.value === 'outfit')
        .slice(0, limit)
        .map((item: any) => {
          return {
            name: item.name,
            image: item.images.icon,
          };
        });

      console.log(limitedData);

      dispatch({
        type: ActionTypes.FETCH_SKINS_SUCCESS,
        payload: limitedData,
      });
    } else {
      dispatch({
        type: ActionTypes.FETCH_SKINS_ERROR,
        payload: 'Failed to fetch skins',
      });
    }
  } catch (error: any) {
    dispatch({
      type: ActionTypes.FETCH_SKINS_ERROR,
      payload: error.message,
    });
  }
};
