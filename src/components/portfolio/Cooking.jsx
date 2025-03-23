import React from 'react';
import { FaHeart, FaRegComment, FaPaperPlane, FaBookmark } from 'react-icons/fa';

const Cooking = () => {
    return (
        <div className="post-section">
            <div className="post">
                <div className="post-header">
                    <div className="post-user">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
                            alt="User"
                        />
                        <span>Cooking</span>
                    </div>
                    <FaBookmark />
                </div>
                <div className="post-image">
                    <img
                        src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2hub2Z3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                        alt="Post content"
                    />
                </div>
                <div className="post-footer">
                    <div className="post-actions">
                        <FaHeart />
                        <FaRegComment />
                        <FaPaperPlane />
                    </div>
                    <FaBookmark />
                </div>
                <div className="post-caption">
                    <span>John Doe</span> Exploring the beauty of nature. #travel #adventure
                </div>
            </div>
        </div>
    );
};

export default Cooking;