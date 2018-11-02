import React from 'react';

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div>
            {anecdote.content}<br />
            has {anecdote.votes} <button onClick={handleVote(anecdote.id)}>vote</button>
        </div>
    );
};

export default Anecdote;