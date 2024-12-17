import { combineReducers } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favoritesReducer";
import { userReducer } from "./userReducer";
import { skinsReducer } from "./skinsReducer";
import { filterReducer } from "./filterReducer";
import { historyReducer } from "./historyReducer";

export const rootReducer = combineReducers({
   favorites: favoritesReducer,
   user: userReducer,
   skins: skinsReducer,
   filter: filterReducer,
   history: historyReducer
});