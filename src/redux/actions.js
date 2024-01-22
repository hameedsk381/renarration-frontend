// actions.js
export const ADD_RENARRATION_BLOCK = 'ADD_RENARRATION_BLOCK';
export const UPDATE_RENARRATION_BLOCK = 'UPDATE_RENARRATION_BLOCK';
export const DELETE_RENARRATION_BLOCK = 'DELETE_RENARRATION_BLOCK';

export const addRenarrationBlock = (block) => ({
    type: ADD_RENARRATION_BLOCK,
    payload: block,
});

export const updateRenarrationBlock = (block) => ({
    type: UPDATE_RENARRATION_BLOCK,
    payload: block,
});

export const deleteRenarrationBlock = (blockId) => ({
    type: DELETE_RENARRATION_BLOCK,
    payload: blockId,
});
export const FETCH_HTML_START = 'FETCH_HTML_START';
export const FETCH_HTML_SUCCESS = 'FETCH_HTML_SUCCESS';
export const FETCH_HTML_FAILURE = 'FETCH_HTML_FAILURE';

// New Action Creators
export const fetchHtmlStart = () => ({
    type: FETCH_HTML_START,
});

export const fetchHtmlSuccess = (htmlContent) => ({
    type: FETCH_HTML_SUCCESS,
    payload: htmlContent,
});

export const fetchHtmlFailure = (errorMessage) => ({
    type: FETCH_HTML_FAILURE,
    payload: errorMessage,
});
