const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const actionFor = {
    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content: content,
                votes: 0,
                id: generateId()
            }
        }
    },
    vote(id) {
        return {
            type: 'ADD_VOTE',
            data: { id }
        }
    }
}

export default actionFor