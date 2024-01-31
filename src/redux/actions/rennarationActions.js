export const ADD_RENNARATED_BLOCK = 'ADD_RENNARATED_BLOCK';
export const REMOVE_RENNARATED_BLOCK = 'REMOVE_RENNARATED_BLOCK';
export const UPDATE_RENNARATED_BLOCK = 'UPDATE_RENNARATED_BLOCK';
export const RESET_RENNARATIONS = 'RESET_RENNARATIONS';
export const addRennarationBlock = (block) => ({
    type: ADD_RENNARATED_BLOCK,
    payload: block,
});
export const removeRennaratedBlock = (blockId) => ({
    type: REMOVE_RENNARATED_BLOCK,
    payload: blockId,
});
export const updateRennaratedBlock = (id, updatedBlock) => {
    return {
        type: 'UPDATE_RENNARATED_BLOCK',
        payload: { id, ...updatedBlock }
    };
};
export const resetRennarations = () => {
    return {
        type: 'RESET_RENNARATIONS'
    };
};