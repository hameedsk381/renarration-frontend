export const initialState = {
    isFetching: false,
    initialHtmlContent: null, // Initial HTML content fetched
    currentUrl: '', // Current URL being processed
    errorMessage: '', // Error messages
    progress: 0, // Progress of current fetching operation
    deviceType: null, // Type of the device (e.g., 'mobile', 'desktop')
    history: [], // History of URLs visited
};

export const urlReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                isFetching: true
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isFetching: false,
                initialHtmlContent: action.payload.htmlContent,
                currentUrl: action.payload.url, // Update current URL on success
                errorMessage: '',
                history: [...state.history, { url: action.payload.url, htmlContent: action.payload.htmlContent }]
            };
        case 'FETCH_FAILURE':
            console.log(action.payload)
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            };
        case 'UPDATE_PROGRESS':
            return {
                ...state,
                progress: action.payload.progress,
            };
        case 'SET_DEVICE_TYPE':
            return {
                ...state,
                deviceType: action.payload.deviceType,
            };
        case 'RESET_STATE':
            return initialState; // Resets to initial state
        // Add other action types as needed
        default:
            return state;
    }
};

export default urlReducer;
