export const GET_FETCH_REGIONS = "GET_FETCH_REGIONS";
export const SET_SUBMIT = "SET_SUBMIT";
export const SET_REGION = "SET_REGION";

const regionUrl = "https://api.hh.ru/areas/5";

export function regionsFetchDataSuccess(payload) {
  return {
    type: GET_FETCH_REGIONS,
    payload,
  };
}
export function setSummitButton(payload) {
  return {
    type: SET_SUBMIT,
    payload,
  };
}
export function setRegion(regionId, regionCities) {
  return {
    type: SET_REGION,
    regionId,
    regionCities,
  };
}

export function regionsFetchData() {
  return async (dispatch) => {
    await fetch(regionUrl)
      .then((response) => response.json())
      .then((regions) => dispatch(regionsFetchDataSuccess(regions.areas)));
  };
}
