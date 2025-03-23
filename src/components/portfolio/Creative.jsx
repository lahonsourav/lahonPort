import React, { useState } from 'react';
import './creative.css';
import Musicx from './Musicx';
import Reels from './Reels';
import Coming from './Coming';
import PHOTO from "../../assets/mejpg.jpg";
import Mok from '../../assets/mokshaligned.png'


const Creative = () => {
    const [selectedSection, setSelectedSection] = useState('Reels'); // Default to Reels

    const handleStoryClick = (section) => {
        setSelectedSection(section); // Update the selected section
    };

    return (
        <div className="creative_container">
            {/* Story Section */}
            <div className="middle-section">
                <div
                    className="story_container"
                    onClick={() => handleStoryClick('Music')} // Set section to Music
                >
                    <img src={PHOTO} alt="User" />
                    <div className="post_title_container">
                        <small>Music</small>
                    </div>
                </div>

                <div
                    className="story_container"
                    onClick={() => handleStoryClick('Reels')} // Set section to Reels
                >
                    <img src={PHOTO} alt="User" />
                    <div className="post_title_container">
                        <small>Reels</small>
                    </div>
                </div>

                <div
                    className="story_container"
                    onClick={() => handleStoryClick('Coming')} // Set section to Coming
                >
                    <img src={Mok} alt="User" />
                    <div className="post_title_container">
                        <small>Coming soon</small>
                    </div>
                </div>
            </div>

            {/* Render the selected section */}
            <div className="content-section">
                {selectedSection === 'Reels' && <Reels />}
                {selectedSection === 'Music' && <Musicx />}
                {selectedSection === 'Coming' && <Coming />}
            </div>
        </div>
    );
};

export default Creative;