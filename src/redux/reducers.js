import { combineReducers } from 'redux';
import { ADD_RENARRATION_BLOCK, UPDATE_RENARRATION_BLOCK, DELETE_RENARRATION_BLOCK, UPDATE_HTML_CONTENT } from './actions';
import { FETCH_HTML_START, FETCH_HTML_SUCCESS, FETCH_HTML_FAILURE } from './actions';
const initialBlockState = {
    renarrationBlocks: [],
};

export const renarrationBlocksReducer = (state = initialBlockState, action) => {
    switch (action.type) {
        case ADD_RENARRATION_BLOCK:
            return {
                ...state,
                renarrationBlocks: [...state.renarrationBlocks, action.payload],
            };
        case UPDATE_RENARRATION_BLOCK:
            return {
                ...state,
                renarrationBlocks: state.renarrationBlocks.map(block =>
                    block.id === action.payload.id ? action.payload : block
                ),
            };

        case DELETE_RENARRATION_BLOCK:
            return {
                ...state,
                renarrationBlocks: state.renarrationBlocks.filter(block => block.id !== action.payload),
            };
        default:
            return state;
    }
};


const initialUrlState = {
    htmlContent: '',
    isFetching: false,
    errorMessage: '',
};

export const urlReducer = (state = initialUrlState, action) => {
    switch (action.type) {
        case FETCH_HTML_START:
            return {
                ...state,
                isFetching: true,
                errorMessage: '', // Reset error message on new fetch
            };
        case FETCH_HTML_SUCCESS:
            return {
                ...state,
                isFetching: false,
                htmlContent: action.payload,
            };
        case FETCH_HTML_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            };
        // Your reducer handling the htmlContent part of the state
        case UPDATE_HTML_CONTENT:
            return {
                ...state,
                htmlContent: action.payload,
            };

        default:
            return state;
    }
};
const rootReducer = combineReducers({
    renarrationBlocks: renarrationBlocksReducer,
    url: urlReducer,
});

export default rootReducer;