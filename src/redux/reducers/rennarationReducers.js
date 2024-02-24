import {
  ADD_RENNARATED_BLOCK, REMOVE_RENNARATED_BLOCK, RESET_RENNARATIONS, UPDATE_RENNARATED_BLOCK,
} from '../actions/rennarationActions';

const initialState = {
  rennaratedBlocks: [],
};

const rennarationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RENNARATED_BLOCK:
      return {
        ...state,
        rennaratedBlocks: [...state.rennaratedBlocks, action.payload],
      };

    case REMOVE_RENNARATED_BLOCK:
      return {
        ...state,
        rennaratedBlocks: state.rennaratedBlocks.filter((block) => block.id !== action.payload),
      };
    case UPDATE_RENNARATED_BLOCK:
      return {
        ...state,
        rennaratedBlocks: state.rennaratedBlocks.map((block) => (block.id === action.payload.id ? { ...block, ...action.payload } : block)),
      };
    case RESET_RENNARATIONS:
      return initialState;
    default:
      return state;
  }
};
export default rennarationReducer;
