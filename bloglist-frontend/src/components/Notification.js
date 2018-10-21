import React from 'react';

const Notification = ({ error, confirmation }) => {
    if (!(error || confirmation)) {
        return (
            <div className='hiddenNotification'>
                .
            </div>
        )
    }

    if (error) {
        return (
            <div className='error'>
                {error}    
            </div>
        );
    }

    return (
        <div className='confirmation'>
            {confirmation}
        </div>
    )
};

export default Notification;