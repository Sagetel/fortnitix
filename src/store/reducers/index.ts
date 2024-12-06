import { combineReducers } from "@reduxjs/toolkit";
import { skinsReducer } from './skinReducer'
import { favoritesReducer } from "./favoritesReducer";

export const rootReducer = combineReducers({
   skins:  skinsReducer,
   favorites: favoritesReducer
});