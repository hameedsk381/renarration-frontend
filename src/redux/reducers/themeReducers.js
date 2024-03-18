import { SET_THEME } from '../actions/themeActions.js';

const initialState = {
  currentTheme: 'roseGarden',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, currentTheme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
