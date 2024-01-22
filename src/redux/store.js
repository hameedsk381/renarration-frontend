// store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

// Function to load the state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined; // If no state in local storage, return undefined to use reducer's initial state
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state:', err);
        return undefined;
    }
};

// Function to save the state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error('Error saving state:', err);
        // Ignore write errors or handle them in a way you prefer
    }
};

// Load the persisted state
const persistedState = loadState();

// Create the store with the persisted state and apply thunk middleware
const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
);

// Subscribe to store changes and save the state to local storage
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
