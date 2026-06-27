import React from 'react';
import './creative.css';
import Musicx from './Musicx';
import PHOTO from "../../assets/mejpg.jpg";


const Creative = () => {
    return (
        <div className="creative_container">
            <div className="middle-section">
                <div className="story_container">
                    <img src={PHOTO} alt="User" />
                    <div className="post_title_container">
                        <small>Music</small>
                    </div>
                </div>
            </div>

            <div className="content-section">
                <Musicx />
            </div>
        </div>
    );
};

export default Creative;