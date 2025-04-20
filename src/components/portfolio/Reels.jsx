import React, { useEffect } from 'react';

// Reusable Post Component for Instagram
const Post = ({ videoUrl }) => {
    useEffect(() => {
        // Dynamically load the Instagram embed script
        const script = document.createElement('script');
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        };
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="insta-post">
            <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={videoUrl}
                data-instgrm-version="14"
                style={{
                    background: "#FFF",
                    border: "0",
                    borderRadius: "3px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    padding: "0",
                    width: "100%",
                }}
            ></blockquote>
        </div>
    );
};

// Main Reels Component for Instagram Posts
const Reels = () => {
    return (
        <div className="post-section">
            <Post
                videoUrl="https://www.instagram.com/reel/DIbyPR5SFaN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            />
            <Post
                videoUrl="https://www.instagram.com/reel/DHKa6GUSPBD/?utm_source=ig_embed&amp;utm_campaign=loading"
            />
            <Post
                videoUrl="https://www.instagram.com/reel/DHT57IcTLeQ/?utm_source=ig_web_copy_link&amp;igsh=MzRlODBiNWFlZA=="
            />
        </div>
    );
};

export default Reels;