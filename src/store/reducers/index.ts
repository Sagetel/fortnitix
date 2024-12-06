import { combineReducers } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favoritesReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
   favorites: favoritesReducer,
   user: userReducer
});