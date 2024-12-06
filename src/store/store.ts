import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk  from 'redux-thunk';
import { rootReducer } from './reducers/index';



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


// Устаревший варинт подключения 
// export const store = createStore(rootReducer, 
//   composeWithDevTools(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
