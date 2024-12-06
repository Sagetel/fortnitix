import { Dispatch } from "redux"
import { FavoritesActionTypes, IFavoritesAction } from "../../utils/types"
import { supabase } from "../../components/supabaseClient"



export const createFavorites = () => {
    return async (dispatch: Dispatch) => {
        try {
            const user = await supabase.auth.getUser();
            if (user.data.user?.id) {
                const { data: newFavorite, error } = await supabase.from("favorites").insert([
                    {
                        userId: user.data.user.id,
                        outfitId: "аутфит",
                    },
                ]).select(); 
                if (error) {
                    throw new Error(error.message);
                }
                dispatch({ type: FavoritesActionTypes.CREATE_FAVORITE, payload: newFavorite[0] });
            }
        } catch (error) {
            console.error("Ошибка добавления в избранное:", error);
            dispatch({ type: FavoritesActionTypes.CREATE_FAVORITE_ERROR, payload: (error as Error).message });
        }
    }
}



export const getFavorites = () => {
    return async (dispatch: Dispatch) => {
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
            dispatch({ type: FavoritesActionTypes.GET_FAVORITE, payload: favorites });
        } catch (error) {
            console.error("Ошибка получения фаворита:", (error as Error).message);
            dispatch({ type: FavoritesActionTypes.GET_FAVORITE_ERROR, payload: (error as Error).message });
        }
    }
}




