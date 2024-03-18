export const initialState = {
  renarrationTitle: '',
  renarrationId: '',
};

const renarrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RENNARATION_TITLE':
      return {
        ...state,
        renarrationTitle: action.payload,
      };
    case 'ADD_RENARRATION_ID':
      return {
        ...state,
        renarrationId: action.payload,
      };
    default:
      return state;
  }
};

export default renarrationReducer;
