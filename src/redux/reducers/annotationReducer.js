import {
  ADD_ANNOTATED_BLOCK, REMOVE_ANNOTATED_BLOCK,
  RESET_ANNOTATIONS, SET_ANNOTATED_HTML_CONTENT,
  TOGGLE_ANNOTATION_MODE, UPDATE_ANNOTATED_BLOCK,
  ADD_ANNOTATED_BLOCKS,
} from '../actions/annotationActions';

const initialAnnState = {
  mode: false,
  htmlforAnnotation: null,
  annotatedBlocks: [],
};

const annotationReducer = (state = initialAnnState, action) => {
  switch (action.type) {
    case TOGGLE_ANNOTATION_MODE:
      return {
        ...state,
        mode: !state.mode,
      };
    case SET_ANNOTATED_HTML_CONTENT:
      return {
        ...state,
        htmlforAnnotation: action.payload,
      };
    case ADD_ANNOTATED_BLOCK:
      return {
        ...state,
        annotatedBlocks: [...state.annotatedBlocks, action.payload],
      };
    case UPDATE_ANNOTATED_BLOCK:
      return {
        ...state,
        annotatedBlocks: state.annotatedBlocks.map((block) => (block.target.id === action.payload.id
          ? { ...block, ...action.payload } : block)),
      };
    case REMOVE_ANNOTATED_BLOCK:
      return {
        ...state,
        annotatedBlocks: state.annotatedBlocks.filter((block) => block.target.id !== action.payload),
      };
    case RESET_ANNOTATIONS:
      return initialAnnState;
    case ADD_ANNOTATED_BLOCKS:
      return {
        ...state,
        annotatedBlocks: action.payload,
      };
    default:
      return state;
  }
};
export default annotationReducer;
