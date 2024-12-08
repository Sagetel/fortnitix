import { combineReducers } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favoritesReducer";
import { userReducer } from "./userReducer";
import { skinsReducer } from "./skinReducer";

export const rootReducer = combineReducers({
   favorites: favoritesReducer,
   user: userReducer,
   skins: skinsReducer
});