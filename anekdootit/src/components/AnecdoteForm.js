import React, { Component } from 'react';

class AnecdoteForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            anecdote: ''
        }
    }

    handleChange = (event) => {
        this.setState({ anecdote: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleCreation(this.state.anecdote)
        this.setState({ anecdote: '' })
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.anecdote} onChange={this.handleChange} /><br />
                    <button type='submit'>create</button>
                </form>
            </div>
        );
    }
}

export default AnecdoteForm;