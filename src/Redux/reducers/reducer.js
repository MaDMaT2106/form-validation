import { GET_FETCH_REGIONS, SET_SUBMIT, SET_REGION } from "../actions/action";

const initialState = {
  regions: [],
  submit: false,
  regionId: null,
  regionCities: [],
};

export function formReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FETCH_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case SET_SUBMIT:
      return {
        ...state,
        submit: action.payload,
      };
    case SET_REGION:
      return {
        ...state,
        regionId: action.regionId,
        regionCities: [...action.regionCities],
      };
    default:
      return state;
  }
}
