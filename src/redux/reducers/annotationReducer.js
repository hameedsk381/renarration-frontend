import { ADD_ANNOTATED_BLOCK, REMOVE_ANNOTATED_BLOCK, SET_ANNOTATED_HTML_CONTENT, TOGGLE_ANNOTATION_MODE } from "../actions/annotationActions";

const initialState = {
    mode: false,
    htmlContent: '',
    annotatedBlocks: [],
};

const annotationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ANNOTATION_MODE:
            return {
                ...state,
                mode: !state.mode
            };
        case SET_ANNOTATED_HTML_CONTENT:
            return {
                ...state,
                htmlContent: action.payload
            };
        case ADD_ANNOTATED_BLOCK:
            return {
                ...state,
                annotatedBlocks: [...state.annotatedBlocks, action.payload]
            };
        case REMOVE_ANNOTATED_BLOCK:
            return {
                ...state,
                annotatedBlocks: state.annotatedBlocks.filter(block => block.id !== action.payload)
            };
        default:
            return state;
    }
};

export default annotationReducer;

