import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner" />
            <span className="loading-text">loading</span>
        </div>
    );
};

export default Loading;
