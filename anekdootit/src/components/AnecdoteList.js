import React from 'react'
import Anecdote from './Anecdote';

const AnecdoteList = ({ anecdotes, handleVote }) => {
    return (
        <div>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />)}
        </div>
    );
};

export default AnecdoteList;