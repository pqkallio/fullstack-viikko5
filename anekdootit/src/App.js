import React from 'react'
import AnecdoteList from './components/AnecdoteList';
import actionFor from './actions'
import AnecdoteForm from './components/AnecdoteForm';

class App extends React.Component {
    onVote = (id) => () => {
        this.props.store.dispatch(
            actionFor.vote(id)
        )
    }

    onCreation = (anecdote) => {
        this.props.store.dispatch(
            actionFor.anecdoteCreation(anecdote)
        )
    }

    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                <AnecdoteList
                    anecdotes={this.props.store.getState().anecdotes}
                    handleVote={this.onVote} />
                <AnecdoteForm handleCreation={this.onCreation} />
            </div>
        )
    }
}

export default App