const ActionType = {
    RATE_GOOD: 'good',
    RATE_NEUTRAL: 'neutral',
    RATE_BAD: 'bad'
}

const initialState = {
    [ActionType.RATE_GOOD]: 0,
    [ActionType.RATE_NEUTRAL]: 0,
    [ActionType.RATE_BAD]: 0
}

const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.RATE_GOOD:
        case ActionType.RATE_NEUTRAL:
        case ActionType.RATE_BAD:
            return {
                ...state,
                [action.type]: state[action.type] + 1
            }
        default:
            return state
    }
}

export { initialState, ratingsReducer }