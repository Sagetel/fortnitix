import { configureStore, ThunkAction, Action, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import thunk  from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'
import { rootReducer } from './reducers/index';

// export const store = configureStore({
//   reducer: rootReducer,

// });


export const store = createStore(rootReducer, applyMiddleware(thunk));


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
