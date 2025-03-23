import React from 'react';
import { FaHeart, FaRegComment, FaPaperPlane, FaBookmark } from 'react-icons/fa';
import Mok from '../../assets/mokshaligned.png'
import PHOTO from "../../assets/mejpg.jpg";


const Coming = () => {
    return (
        <div className="post-section">
            <div className="post">
                <div className="post-header">
                    <div className="post-user">
                        <img
                            src={PHOTO}
                            alt="img"
                        />
                        <span>Moksha</span>
                    </div>
                    <FaBookmark />
                </div>
                <div className="post-image">
                    <img
                        src={Mok}
                        alt="Moksha logo"
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
                    <span>Moksha,</span>  is a project that is incredibly close to my heart. It embodies a journey of passion, creativity, and relentless dedication, built entirely from scratch with the hope of inspiring and connecting with others. This project is more than just an idea—it’s a reflection of my dreams, values, and the countless hours of effort poured into making it a reality. It’s a labor of love and a testament to perseverance, representing a step toward something truly meaningful. I can’t wait to unveil this creation and share it with the world, hoping it resonates deeply with everyone who experiences it. Stay tuned!
                </div>
            </div>
        </div>
    );
};

export default Coming;