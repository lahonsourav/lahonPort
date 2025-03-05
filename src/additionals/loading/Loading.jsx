import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>on your way</p>
        </div>
    );
};

export default Loading;