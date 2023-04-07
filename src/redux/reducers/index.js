const initialState = {
  city: { name: "Reggio Calabria", lat: 0, lon: 0 },
  current: {},
  hourly: [],
  daily: [],
  isLoading: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return (state = {
        ...state,
        city: {
          name: action.payload.name,
          lat: action.payload.lat,
          lon: action.payload.lon,
        },
      });
    case "CHANGE_CITY":
      return (state = {
        ...state,
        city: { ...state.city, name: action.payload.name },
      });
    default:
      return state;
  }
};
export default mainReducer;
