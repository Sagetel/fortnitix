import { Dispatch } from "redux";
import { FavoritesActionTypes } from "../../utils/types";
import { supabase } from "../../components/supabaseClient";
import { RootState } from "../store";
import { ShopItem } from "../../utils/types";

interface CreateFavoritesProps {
  mainId: string;
  userUId: string;
  product: ShopItem;
}
export const createFavorites = ({ mainId, userUId, product }: CreateFavoritesProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await supabase.auth.getUser();
      if (user.data.user?.id) {
        const { data: newFavorite, error } = await supabase
          .from("favorites")
          .insert([
            {
              userId: userUId,
              outfitId: mainId, 
            },
          ])
          .select();
        if (error) {
          throw new Error(error.message);
        }

        dispatch({
          type: FavoritesActionTypes.CREATE_FAVORITE,
          payload: product,
        });
      }
    } catch (error) {
      console.error("Ошибка добавления в избранное:", error);
      dispatch({
        type: FavoritesActionTypes.CREATE_FAVORITE_ERROR,
        payload: (error as Error).message,
      });
    }
  };
};

export const getFavorites = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: FavoritesActionTypes.GET_FAVORITE });
    try {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw new Error(authError.message);
      }
      const { data: favorites, error: dbError } = await supabase
        .from("favorites")
        .select("*")
        .eq("userId", user.user.id);
      if (dbError) {
        throw new Error(dbError.message);
      }
      const shopSkins: ShopItem[] = getState().skins.shop;
      const favoriteMap = favorites.map((fav) => fav.outfitId);
      const favoriteSkins = shopSkins.filter((skin) =>
        favoriteMap.includes(skin.mainId)
      );
      dispatch({
        type: FavoritesActionTypes.GET_FAVORITE,
        payload: favoriteSkins,
      });
    } catch (error) {
      console.error(
        "Ошибка получения избранных скинов:",
        (error as Error).message
      );
      dispatch({
        type: FavoritesActionTypes.GET_FAVORITE_ERROR,
        payload: (error as Error).message,
      });
    }
  };
};
