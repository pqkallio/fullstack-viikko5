import React from 'react';

const Notification = ({ type, notification }) => {
    if (!type) {
        return (
            <div className='notification hiddenNotification'>
                .
            </div>
        )
    }

    return (
        <div className={'notification ' + type}>
            {notification}    
        </div>
    );
};

export default Notification;