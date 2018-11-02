const initialState = {
    anecdotes: [
        {
            content: 'If it hurts, do it more often',
            votes: 0,
            id: 1
        },
        {
            content: 'Adding manpower to a late software project makes it later!',
            votes: 0,
            id: 2
        },
        {
            content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            votes: 0,
            id: 3
        },
        {
            content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            votes: 0,
            id: 4
        },
        {
            content: 'Premature optimization is the root of all evil.',
            votes: 0,
            id: 5
        },
        {
            content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
            votes: 0,
            id: 6
        },
    ]
}

const anecdoteSorter = (a, b) => {
    const diff = b.votes - a.votes

    return diff === 0 ? a.content.localeCompare(b.content) : diff
}

initialState.anecdotes.sort(anecdoteSorter)

const anecdoteReducer = (state = initialState, action) => {
    let anecdotes
    switch (action.type) {
        case 'NEW_ANECDOTE':
            anecdotes = state.anecdotes.concat(action.data)
            anecdotes.sort(anecdoteSorter)
            return { ...state, anecdotes }
        case 'ADD_VOTE':
            anecdotes = state.anecdotes.map(a => a.id !== action.data.id ? a : { ...a, votes: ++a.votes })
            anecdotes.sort(anecdoteSorter)
            return { ...state, anecdotes }
        default:
            return state
    }
}

export default anecdoteReducer