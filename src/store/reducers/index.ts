import { combineReducers } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favoritesReducer";
import { userReducer } from "./userReducer";
import { skinsReducer } from "./skinsReducer";
import { filterReducer } from "./filterReducer";

export const rootReducer = combineReducers({
   favorites: favoritesReducer,
   user: userReducer,
   skins: skinsReducer,
   filter: filterReducer
});