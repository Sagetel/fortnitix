import { FilterActionTypes, FilterState } from '../../utils/types';

const initialState: FilterState = {
  selectedValues: {},
};

export const filterReducer = (state = initialState, action: any) => {
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
      return initialState; 
    default:
      return state;
  }
};