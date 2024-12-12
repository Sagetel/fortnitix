import { combineReducers } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favoritesReducer";
import { userReducer } from "./userReducer";
import { skinsReducer } from "./skinsReducer";

export const rootReducer = combineReducers({
   favorites: favoritesReducer,
   user: userReducer,
   skins: skinsReducer
});