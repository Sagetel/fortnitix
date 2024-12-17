import { FilterAction, FilterActionTypes } from '../../utils/types';

type FilterState = {
  selectedValues: Record<string, string>;
}

const initialState: FilterState = {
  selectedValues: {},
};

export const filterReducer = (state = initialState, action: FilterAction) => {
  switch (action.type) {
    case FilterActionTypes.SET_FILTER:
      return {
        ...state,
        selectedValues: {
          ...state.selectedValues,
          [action.payload.key]: action.payload.value,
        },
      };
    case FilterActionTypes.RESET_FILTERS:
      return initialState
    default:
      return state;
  }
};