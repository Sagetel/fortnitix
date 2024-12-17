import { HistoryActionTypes, FiltersType } from "../../utils/types";

export const addSearchHistory = (searchData: { query: string; filters: FiltersType }) => ({
  type: HistoryActionTypes.ADD_SEARCH_HISTORY,
  payload: searchData,
});

export const loadSearchHistory = () => ({
  type: HistoryActionTypes.LOAD_SEARCH_HISTORY,
});
