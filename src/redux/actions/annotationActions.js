// Action Types
export const TOGGLE_ANNOTATION_MODE = 'TOGGLE_ANNOTATION_MODE';
export const SET_ANNOTATED_HTML_CONTENT = 'SET_ANNOTATED_HTML_CONTENT';

// Action Creators
export const toggleAnnotationMode = () => ({
    type: TOGGLE_ANNOTATION_MODE,
});

export const setAnnotatedHtmlContent = (htmlforannotation) => ({
    type: SET_ANNOTATED_HTML_CONTENT,
    payload: htmlforannotation,
});
// Additional Action Types
export const ADD_ANNOTATED_BLOCK = 'ADD_ANNOTATED_BLOCK';
export const REMOVE_ANNOTATED_BLOCK = 'REMOVE_ANNOTATED_BLOCK';

// Action Creators
export const addAnnotatedBlock = (block) => ({
    type: ADD_ANNOTATED_BLOCK,
    payload: block,
});

export const removeAnnotatedBlock = (blockId) => ({
    type: REMOVE_ANNOTATED_BLOCK,
    payload: blockId,
});
