import React from 'react';
import { FaHeart, FaRegComment, FaPaperPlane, FaBookmark } from 'react-icons/fa';
import PHOTO from "../../assets/mejpg.jpg";

// Reusable Post Component
const Post = ({ userImage, userName, title, subtitle, videoUrl, caption }) => {
    return (
        <div className="post">
            <div className="post-header">
                <div className="post-user">
                    <img src={userImage} alt="User" />
                    <div className="post_title_container">
                        <strong>{title}</strong>
                        <small>{subtitle}</small>
                    </div>
                </div>
                <FaBookmark />
            </div>
            <div className="post-video">
                <iframe
                    src={videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
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
                <span>{userName}</span> {caption}
            </div>
        </div>
    );
};

// Main Musicx Component
const Musicx = () => {
    return (
        <div className="post-section">
            <Post
                userImage={PHOTO}
                userName="ft Pinccol & Kaustabh"
                title="Adhorua Xopun"
                subtitle="assamese lyrical video"
                videoUrl="https://www.youtube.com/embed/OTNoeba54eo"
                caption="It's a story about the insecurities we face while dreaming big, losing hope but still pushing forward. We lose friends, miss our childhood, yet never look back."
            />
            <Post
                userImage={PHOTO}
                userName="ft Mayukh, Gouranga, Ripon, Punam"
                title="Boi Jaa"
                subtitle="assamese music video"
                videoUrl="https://www.youtube.com/embed/SEE6_nwq43E?si=LGGYLmOp7ZjvA7wn"
                caption="This love song, written and composed by me, holds a special place in my heart. It reflects my deepest emotions and is a true expression of my feelings."
            />
            <Post
                userImage={PHOTO}
                userName="slahon"
                title="Maa - The stars"
                subtitle="assamese lyrical rap"
                videoUrl="https://www.youtube.com/embed/VYTG1Z2eF1A?si=agO64EC3vH-zNlkf"
                caption="A heartfelt tribute to the stars, dedicated to all the moms and everyone who are far away from home, longing for the warmth of their loved ones."
            />
            <Post
                userImage={PHOTO}
                userName="slahon"
                title="Proloy 2.0"
                subtitle="assamese protest poetry"
                videoUrl="https://www.youtube.com/embed/-YwHXkFhe8Q?si=LpZPZhF6m7xBHVzP"
                caption="A protest poem that sheds light on the harsh realities of society, where prosperity feels like a distant dream, overshadowed by the bitter truths we face every day."
            />

            <Post
                userImage={PHOTO}
                userName="ft. Mayukh, Kaustabh"
                title="Prapti"
                subtitle="assamese lyrical rap music"
                videoUrl="https://www.youtube.com/embed//-Yzg9fJV8mo?si=q-QAM8aerGKgVfh2"
                caption="Prapti jodi xunyo hoy, Ashru buwabo kune? aklnato hoi geetor xurot, alingon koribo kune?"
            />

            <Post
                userImage={PHOTO}
                userName="ft. Nilam"
                title="Paap Punya"
                subtitle="storytelling rap MV"
                videoUrl="https://www.youtube.com/embed/bS7xAo-UgsI?si=SCBDnj4gEUVHzQ-o"
                caption="A simple yet powerful narrative that conveys a meaningful story, leaving a lasting impression."
            />
        </div>
    );
};

export default Musicx;