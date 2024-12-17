import { FiltersType, HistoryAction, HistoryActionTypes } from './../../utils/types';

interface HistoryState {
  history: Array<{ query: string; filters: FiltersType }>;
}

const initialState: HistoryState = {
  history: [],
};

export const historyReducer = (state = initialState, action: HistoryAction) => {
  switch (action.type) {
    case HistoryActionTypes.ADD_SEARCH_HISTORY:
      const updatedHistory = [...state.history, action.payload];
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      return {
        ...state,
        history: updatedHistory,
      };
    case HistoryActionTypes.LOAD_SEARCH_HISTORY:
      return {
        ...state,
      };
    default:
      return state;
  }
};

