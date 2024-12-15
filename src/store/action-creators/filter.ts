import { FilterActionTypes } from '../../utils/types';

export const setFilter = (key: string, value: string) => ({
  type: FilterActionTypes.SET_FILTER,
  payload: { key, value },
});

export const resetFilters = () => ({
  type: FilterActionTypes.RESET_FILTERS
});

